const fs = require("fs");
const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";
const isProduction = process.env.NODE_ENV === "production";
const swSrc = "./src/service-worker.ts";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: {
    app: "./src/index.tsx",
    // "editor.worker": "monaco-editor/min/vs/editor/editor.main.js",
    // "json.worker": "monaco-editor/min/vs/language/json/jsonWorker",
    // "css.worker": "monaco-editor/min/vs/language/css/cssWorker",
    // "html.worker": "monaco-editor/min/vs/language/html/htmlWorker",
    // "ts.worker": "monaco-editor/min/vs/language/typescript/tsWorker",
    "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
    "json.worker": "monaco-editor/esm/vs/language/json/json.worker",
    "css.worker": "monaco-editor/esm/vs/language/css/css.worker",
    "html.worker": "monaco-editor/esm/vs/language/html/html.worker",
    "ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker",
  },
  devServer: {
    // hot: true,
    historyApiFallback: true,
  },
  // devtool: "eval-source-map",
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      // vs: "monaco-editor/min/vs",
      // "monaco-editor": "monaco-editor/min/vs/editor/editor.main.js",
    },
  },
  output: {
    globalObject: "self",
    filename: "[name].bundle.js", // necessary for hardcoded worker names
    path: path.resolve(__dirname, "dist"),
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:8].chunk.js"
      : isDevelopment && "static/js/[name].chunk.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              presets: [
                ["@babel/preset-env", { targets: { chrome: "58" } }],
                "@babel/preset-typescript",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      PUBLIC_URL: ".",
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
    isProduction &&
      fs.existsSync(swSrc) &&
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc,
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
        // Bump up the default maximum size (2mb) that's precached,
        // to make lazy-loading failure scenarios less likely.
        // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      }),
  ].filter(Boolean),

  //https://stackoverflow.com/questions/65640449/how-to-solve-chunkloaderror-loading-hot-update-chunk-second-app-failed-in-webpa
  optimization: {
    runtimeChunk: "single",
    minimize: true,
    // minimizer: [
    //   new TerserWebpackPlugin({
    //     minify: TerserWebpackPlugin.esbuildMinify,
    //   }),
    // ],
    // minimizer: [
    //   new TerserWebpackPlugin({
    //     minify: TerserWebpackPlugin.swcMinify,

    //     terserOptions: {
    //       format: {
    //         comments: false,
    //       },

    //       compress: true,
    //     },
    //     extractComments: false,
    //   }),
    // ],
  },
};
