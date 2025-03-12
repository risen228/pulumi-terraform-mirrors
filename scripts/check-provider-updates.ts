import { readFileSync } from 'node:fs'

type Provider = {
  org: string
  name: string
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP status code ${response.status}`)
  }

  return (await response.json()) as T
}

function areVersionsEqual(v1: string, v2: string) {
  const first = v1.startsWith('v') ? v1.slice(1) : v1
  const second = v2.startsWith('v') ? v2.slice(1) : v2

  return first === second
}

type TerraformPackageResponse = {
  version: string
}

type NpmPackageResponse = {
  'dist-tags': {
    latest: string
  }
}

const providers: Provider[] = JSON.parse(readFileSync('providers.json', 'utf8'))
const updates: Provider[] = []

for (const provider of providers) {
  const { org, name } = provider

  let tfVersion: string | null

  try {
    const { version } = await fetchJson<TerraformPackageResponse>(
      `https://registry.terraform.io/v1/providers/${org}/${name}`,
    )

    tfVersion = version
  } catch {
    continue
  }

  if (!tfVersion) {
    continue
  }

  let npmVersion: string | null = null

  try {
    const npmData = await fetchJson<NpmPackageResponse>(
      `https://registry.npmjs.org/@ptfm/${name}`,
    )

    npmVersion = npmData['dist-tags']?.latest
  } catch {
    // not found
  }

  if (!npmVersion || !areVersionsEqual(tfVersion, npmVersion)) {
    updates.push(provider)
  }
}

console.log(JSON.stringify(updates))
