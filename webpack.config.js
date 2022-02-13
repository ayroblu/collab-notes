const fs = require("fs");
const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";
const isProduction = process.env.NODE_ENV === "production";
const isDebug = !!process.env.DEBUG;
const swSrc = "./src/service-worker.ts";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/index.tsx",
  devServer: {
    compress: true,
  },
  devtool: isDevelopment ? "eval-source-map" : undefined,
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      // Uncaught TypeError: Cannot set properties of null (setting '__h')
      // react: "preact/compat",
      // "react-dom/test-utils": "preact/test-utils",
      // "react-dom": "preact/compat",
      // "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
  output: {
    globalObject: "self",
    filename: "[name].[contenthash:8].bundle.js", // necessary for hardcoded worker names
    path: path.resolve(__dirname, "dist"),
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:8].chunk.js"
      : isDevelopment && "static/js/[name].chunk.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(?:js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          // No noticable performance benefit + larger bundle
          // {
          //   loader: "swc-loader",
          //   options: {
          //     jsc: {
          //       parser: {
          //         syntax: "typescript",
          //         jsx: true,
          //       },
          //       transform: {
          //         react: {
          //           runtime: "automatic",
          //           pragma: "React.createElement",
          //           pragmaFrag: "React.Fragment",
          //           throwIfNamespace: true,
          //           development: false,
          //           useBuiltins: false,
          //         },
          //       },
          //     },
          //   },
          // },
          {
            loader: "babel-loader",
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
    new MonacoWebpackPlugin(),
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
    isDebug && new BundleAnalyzerPlugin(),
    // new webpack.debug.ProfilingPlugin(),
  ].filter(Boolean),

  //https://stackoverflow.com/questions/65640449/how-to-solve-chunkloaderror-loading-hot-update-chunk-second-app-failed-in-webpa
  // optimization: {
  // runtimeChunk: "single",
  // minimize: true,
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
  // },
};
