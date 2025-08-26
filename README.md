# Mummet Workspace

This repository uses npm Workspaces to manage the library package (`mummet-core`) and a side‑by‑side test application (`test-app`). The workspace makes it easy to build, test, and verify the package locally, and then publish it to npm.

## Workspace Layout

- `mummet-core`: the published TypeScript library
- `test-app`: a small TS app used to validate the library (both the released and local builds)

## Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm 9+
- Logged in to npm (`npm login`) for publish steps

## Install

From the repository root:

- Install all workspace deps: `npm install`

This installs dependencies for both `mummet-core` and `test-app`.

## Build

- Build the library: `npm -w mummet-core run build`
- Build the test app: `npm -w test-app run build`

Notes:
- `mummet-core` has a `prepare` script that builds automatically on local install and on publish.
- Rollup emits CommonJS (`dist/index.js`) and ES Module (`dist/index.es.js`) outputs plus `.d.ts` types.

## Test (Library)

- Run unit tests: `npm -w mummet-core test`
- Lint code: `npm -w mummet-core run lint`

## Try It in `test-app`

The test app can depend on either the released version from npm or the local workspace build.

- Use the published release (mummet-core@1.0.0):
  - `npm -w test-app run use:release`
  - `npm -w test-app run build`
  - `node test-app/dist/index.js`

- Switch back to the local workspace build:
  - `npm -w test-app run use:local`
  - `npm -w test-app run build`
  - `node test-app/dist/index.js`

## Publishing `mummet-core` to npm

Publishing is done from the library workspace. The `prepare` script ensures `dist/` is built during publish.

1) Ensure everything is clean and green
- `npm install`
- `npm -w mummet-core run lint`
- `npm -w mummet-core test`
- `npm -w mummet-core run build`

2) Bump the version in `mummet-core/package.json`
- Choose semver appropriately (patch/minor/major)
- Example: `npm --workspace mummet-core version patch` (this updates the version and creates a git tag if git is configured)

3) Optional: Pack locally to verify published contents
- `npm -w mummet-core pack`
- Inspect the generated tarball to confirm `dist/` and type declarations are included

4) Login (once per environment)
- `npm login`
- If your account has 2FA, be ready to enter the OTP

5) Publish
- From repo root, publish the workspace package:
  - `npm -w mummet-core publish --access public`
- Alternatively, `cd mummet-core && npm publish --access public`

6) Verify publication
- In `test-app`: `npm -w test-app run use:release` (updates dependency to the new version)
- Build and run:
  - `npm -w test-app run build`
  - `node test-app/dist/index.js`

## Troubleshooting

- Out‑of‑date installs or conflicts:
  - `rm -rf node_modules package-lock.json && npm install`
- TypeScript cannot find declarations for `mummet-core`:
  - Ensure `mummet-core/dist/*.d.ts` are present (they’re generated on build)
  - `mummet-core/package.json` has `"types"` and `"exports"` entries that expose types
- Rollup config warning about ESM:
  - Harmless; to silence it, either add `"type": "module"` to `mummet-core/package.json` or rename `rollup.config.js` to `rollup.config.mjs`

## Notes on Module/Type Resolution

- The library exposes dual ESM/CJS builds via `exports`:
  - `"."` and `"./by-item"` map to `dist/index.es.js` (import), `dist/index.js` (require), and proper `*.d.ts`
- The test app uses `"module": "NodeNext"` and `"moduleResolution": "NodeNext"` in `tsconfig.json` to align with modern Node + `exports`.

Happy hacking!
