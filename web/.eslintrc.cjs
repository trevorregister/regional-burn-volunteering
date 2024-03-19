/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:@typescript-eslint/recommended' // Add this line
  ],
  parser: '@typescript-eslint/parser', // Specify a parser
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module', // Allows for the use of imports
    project: './tsconfig.json', // Specify it only if you have tsconfig.json file
  },
  env: {
    node: true,
    commonjs: true
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    '@typescript-eslint/no-unused-vars': ['error'], // Add TypeScript specific rules
  }
}