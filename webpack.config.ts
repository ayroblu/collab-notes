import fs from "fs";
import path from "path";

import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import "webpack-dev-server";

const smp = new SpeedMeasurePlugin();

const isDevelopment = process.env["NODE_ENV"] !== "production";
const isProduction = process.env["NODE_ENV"] === "production";
const isDebug = !!process.env["DEBUG"];
const swSrc = "./src/service-worker.ts";

const config: webpack.Configuration = {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/index.tsx",
  devServer: {
    compress: true,
  },
  devtool: isDevelopment && "inline-source-map",
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
      : "static/js/[name].chunk.js",
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
          // {
          //   loader: "esbuild-loader",
          //   options: {
          //     loader: "tsx",
          //     target: "es2018",
          //   },
          // },
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
  ].filter(isTruthy),

  cache: isProduction
    ? false
    : {
        type: "filesystem",
      },

  // Significant perf gain (66s -> 24s) but not minified (0.7MB -> 4.0MB main)
  //   Unminified => 5.2MB (main.bundle.js)
  // optimization: {
  //   minimizer: [
  //     new TerserWebpackPlugin({
  //       minify: TerserWebpackPlugin.esbuildMinify,
  //     }),
  //   ],
  // },
};
export default isDebug ? smp.wrap(config as any) : config;

export function isTruthy<T>(a: T | "" | 0 | false | null | undefined): a is T {
  return !!a;
}
