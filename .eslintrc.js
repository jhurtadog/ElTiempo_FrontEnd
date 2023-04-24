module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  root: true,
  env: {
    browser: true,
    es2021: true,
    jasmine: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "react/react-in-jsx-scope": "off",
  },
};
