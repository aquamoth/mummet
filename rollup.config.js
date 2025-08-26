import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";

// Avoid JSON imports in config for Rollup v4/Node loaders

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      exports: "named",
      sourcemap: true
    },
    {
      file: "dist/index.es.js",
      format: "es",
      exports: "named",
      sourcemap: true
    }
  ],
  external: ["tslib"],
  plugins: [
    external(),
    resolve(),
    typescript({
      tsconfig: 'tsconfig-rollup.json',
      exclude: ["**/__tests__/**"],
      clean: true
    }),
    commonjs()
  ]
};
