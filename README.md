> [!IMPORTANT]  
> The README.md is generated automatically from README.template.md

# Pulumi Terraform Mirrors

Automatically generated Pulumi providers from Terraform providers, published to npm as `@ptfm/*` packages.

## Overview

This project automatically generates Pulumi SDK packages from Terraform providers and publishes them to npm. It runs every 6 hours to check for updates to the underlying Terraform providers and publishes new versions when detected.

## Available Providers

| Provider     | Organization   | Package                                                         | Version                                                             |
| ------------ | -------------- | --------------------------------------------------------------- | ------------------------------------------------------------------- |
| flux         | fluxcd         | [npm package](https://www.npmjs.com/package/@ptfm/flux)         | ![npm version](https://img.shields.io/npm/v/@ptfm/flux.svg)         |
| infisical    | Infisical      | [npm package](https://www.npmjs.com/package/@ptfm/infisical)    | ![npm version](https://img.shields.io/npm/v/@ptfm/infisical.svg)    |
| namecheap    | namecheap      | [npm package](https://www.npmjs.com/package/@ptfm/namecheap)    | ![npm version](https://img.shields.io/npm/v/@ptfm/namecheap.svg)    |
| chainguard   | chainguard-dev | [npm package](https://www.npmjs.com/package/@ptfm/chainguard)   | ![npm version](https://img.shields.io/npm/v/@ptfm/chainguard.svg)   |
| elasticstack | elastic        | [npm package](https://www.npmjs.com/package/@ptfm/elasticstack) | ![npm version](https://img.shields.io/npm/v/@ptfm/elasticstack.svg) |
| netdata      | netdata        | [npm package](https://www.npmjs.com/package/@ptfm/netdata)      | ![npm version](https://img.shields.io/npm/v/@ptfm/netdata.svg)      |
| infra        | infrahq        | [npm package](https://www.npmjs.com/package/@ptfm/infra)        | ![npm version](https://img.shields.io/npm/v/@ptfm/infra.svg)        |
| bunnynet     | BunnyWay       | [npm package](https://www.npmjs.com/package/@ptfm/bunnynet)     | ![npm version](https://img.shields.io/npm/v/@ptfm/bunnynet.svg)     |

> [!NOTE]  
> The table is generated automatically from the `providers.json` file.

## Usage

Install the provider package:

```bash
npm install @ptfm/flux
# or
yarn add @ptfm/flux
# or
pnpm add @ptfm/flux
```

Use in your Pulumi code:

```typescript
import * as flux from '@ptfm/flux'

// Use the provider resources
const gitRepository = new flux.FluxBootstrapGit('repo', {
  // properties
})
```

## Advantages Over Self-Generation

Using these pre-generated providers comes with several benefits:

* **No postinstall scripts** - Packages don't require running `tsc` on installation, eliminating issues when installing packages from scratch (when `.bin` hasn't been created in `node_modules` yet)
* **Simplified dependency management** - No need to install packages via "file:" references, which can cause issues in some package managers
* **Cleaner repositories** - No need to store generated SDK code in your own repository, keeping your codebase lean and focused
* **Always up-to-date** - Automatically updated every 6 hours to match the latest Terraform provider versions
* **Faster project setup** - Skip the time-consuming provider generation step in your CI/CD pipelines
* **Reduced build complexity** - Minimize build environments and dependencies in your projects
* **Consistent versioning** - Package versions match the upstream Terraform provider versions
* **Zero configuration** - Works out of the box with all package managers and build systems

## How It Works

1. The GitHub Action workflow runs on a schedule or when the provider list is updated
2. It checks each provider's current version in the Terraform Registry
3. It compares with the current published version in npm
4. When updates are detected, it:
   - Generates a Pulumi SDK from the Terraform provider
   - Builds the package
   - Publishes it to npm as `@ptfm/{provider-name}`

## Adding New Providers

To request a new provider, open an issue or submit a PR adding it to the `providers.json` file.
