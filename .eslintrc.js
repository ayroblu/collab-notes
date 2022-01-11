// https://robertcooper.me/post/using-eslint-and-prettier-in-a-typescript-project
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["import", "react", "@typescript-eslint"],
  // extends: ["react-app"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
        },
        pathGroups: [
          {
            pattern: "@/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        groups: [
          "builtin",
          "external",
          "internal",
          "unknown",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
    "react/jsx-key": [
      "error",
      {
        checkFragmentShorthand: true,
      },
    ],
  },
};
