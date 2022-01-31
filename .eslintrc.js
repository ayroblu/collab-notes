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
  plugins: [
    "import",
    "react",
    "sort-destructure-keys",
    "@typescript-eslint",
    "css-modules",
    "react-hooks",
  ],
  // extends: ["react-app"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "no-useless-rename": "error",
    eqeqeq: "error",
    "prefer-const": "error",
    "no-throw-literal": "error",
    "prefer-promise-reject-errors": "error",
    "prefer-named-capture-group": "error",
    "prefer-arrow-callback": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-unused-expressions": "error",
    "no-unneeded-ternary": "error",
    "prefer-exponentiation-operator": "error",
    "no-useless-return": "error",
    "prefer-destructuring": [
      "error",
      {
        array: true,
        object: true,
      },
      { enforceForRenamedProperties: true },
    ],
    "prefer-template": "error",

    // Plugin rules follow:
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
    "import/no-duplicates": "error",

    "react/jsx-key": [
      "error",
      {
        checkFragmentShorthand: true,
      },
    ],

    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
    "@typescript-eslint/sort-type-union-intersection-members": "error",

    "sort-destructure-keys/sort-destructure-keys": "error",

    "css-modules/no-unused-class": "error",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      { additionalHooks: "useRecoilCallback" },
    ],
  },
};
