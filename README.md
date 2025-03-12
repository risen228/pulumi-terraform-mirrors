# Pulumi Terraform Mirrors

Automatically generated Pulumi providers from Terraform providers, published to npm as `@ptfm/*` packages.

## Overview

This project automatically generates Pulumi SDK packages from Terraform providers and publishes them to npm. It runs every 6 hours to check for updates to the underlying Terraform providers and publishes new versions when detected.

## Available Providers

| Provider | Organization | Package | Version |
|----------|--------------|---------|---------|
| flux | fluxcd | [npm package](https://www.npmjs.com/package/@ptfm/flux) | ![npm version](https://img.shields.io/npm/v/@ptfm/flux.svg) |
| infisical | Infisical | [npm package](https://www.npmjs.com/package/@ptfm/infisical) | ![npm version](https://img.shields.io/npm/v/@ptfm/infisical.svg) |

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
import * as flux from "@ptfm/flux";

// Use the provider resources
const gitRepository = new flux.FluxBootstrapGit("repo", {
  // properties
});
```

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

## License

MIT