module.exports = {
  extends: ["next", "turbo", "prettier"],
  plugins: ["unused-imports"],
  ignorePatterns: "**/*.d.ts",
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "no-console": "error",
    "react/display-name": "off",
    "no-await-in-loop": "error",
    "no-duplicate-imports": "error",
    "no-else-return": "error",
    "eqeqeq": "error",
    "max-params": ["error", 3],
    "no-alert": "error",
    "no-return-await": "error",
    "no-var": "error",
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ]
  },
};