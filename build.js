const fs = require("fs");
const path = require("path");

const esbuild = require("esbuild");
const cssModulesPlugin = require("esbuild-css-modules-plugin");

fs.rmSync(path.resolve(__dirname, "dist"), { recursive: true });

const workerEntryPoints = [
  "vs/language/json/json.worker.js",
  "vs/language/css/css.worker.js",
  "vs/language/html/html.worker.js",
  "vs/language/typescript/ts.worker.js",
  "vs/editor/editor.worker.js",
];

build({
  entryPoints: workerEntryPoints.map(
    (entry) => `./node_modules/monaco-editor/esm/${entry}`
  ),
  entryNames: "[dir]/[name]-[hash]",
  bundle: true,
  format: "iife",
  outbase: "./node_modules/monaco-editor/esm/",
  outdir: path.join(__dirname, "dist"),
  minify: true,
});

build({
  entryPoints: ["src/index.tsx"],
  entryNames: "static/[dir]/[name]-[hash]",
  assetNames: "static/assets/[name]-[hash]",
  bundle: true,
  format: "iife",
  outdir: path.join(__dirname, "dist"),
  loader: {
    ".ttf": "file",
  },
  minify: true,
  plugins: [cssModulesPlugin()],
});

/**
 * @param {import ('esbuild').BuildOptions} opts
 */
function build(opts) {
  esbuild.build(opts).then((result) => {
    if (result.errors.length > 0) {
      console.error(result.errors);
    }
    if (result.warnings.length > 0) {
      console.error(result.warnings);
    }
  });
}
