# Test App

This is a minimal TypeScript app used to validate `mummet-core` as a dependency.

## Install

From the repository root:
- `npm install`

## Build and Run

- Build: `npm -w test-app run build`
- Run: `node test-app/dist/index.js`

## Switch dependency source

- Use the published release (e.g., mummet-core@1.0.0):
  - `npm -w test-app run use:release`
  - `npm -w test-app run build`
  - `node test-app/dist/index.js`

- Use the local workspace version:
  - `npm -w test-app run use:local`
  - `npm -w mummet-core run build` (ensure the library is built)
  - `npm -w test-app run build`
  - `node test-app/dist/index.js`

## Notes

- The app imports only from the root `mummet-core` export; internal folders like `by-item` are not exposed.
