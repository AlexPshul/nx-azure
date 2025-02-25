const baseConfig = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  { rules: {} },
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    rules: {},
  },
  {
    files: ['*.ts', '*.tsx'],
    rules: {},
  },
  {
    files: ['*.js', '*.jsx'],
    rules: {},
  },
  {
    files: ['./package.json', './generators.json', './executors.json', './migrations.json'],
    parser: 'jsonc-eslint-parser',
    rules: {
      '@nx/nx-plugin-checks': 'error',
    },
  },
  {
    files: ['*.json'],
    parser: 'jsonc-eslint-parser',
    rules: {
      '@nx/dependency-checks': 'error',
    },
  },
];
