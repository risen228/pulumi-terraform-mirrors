import { markdownTable } from 'markdown-table'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

type Provider = {
  org: string
  name: string
}

function generateProvidersTable(providers: Provider[]): string {
  const tableData = [['Provider', 'Organization', 'Package', 'Version']]

  for (const provider of providers) {
    const packageLink = `[npm package](https://www.npmjs.com/package/@ptfm/${provider.name})`
    const versionBadge = `![npm version](https://img.shields.io/npm/v/@ptfm/${provider.name}.svg)`
    tableData.push([provider.name, provider.org, packageLink, versionBadge])
  }

  return markdownTable(tableData)
}

const rootDir = process.cwd()
const providersPath = join(rootDir, 'providers.json')
const providers: Provider[] = JSON.parse(readFileSync(providersPath, 'utf8'))

const templatePath = join(rootDir, 'README.template.md')
const readmePath = join(rootDir, 'README.md')
const templateContent = readFileSync(templatePath, 'utf8')

console.log('Generating providers table...')
const providersTable = generateProvidersTable(providers)

const generatedReadmeNote = `> [!IMPORTANT]  
> The README.md is generated automatically from README.template.md

`

const readmeContent =
  generatedReadmeNote +
  templateContent.replace('<!-- PROVIDERS_TABLE -->', providersTable)

writeFileSync(readmePath, readmeContent)

console.log('README.md has been updated successfully.')
