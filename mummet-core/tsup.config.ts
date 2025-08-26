import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  format: ['cjs', 'esm'],
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  target: 'es2019',
  external: ['tslib'],
})
