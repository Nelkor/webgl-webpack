module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'indent': ['error', 2],
    'no-multi-spaces': 'error',
    'space-infix-ops': 'error',
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'no-trailing-spaces': 2,
    'semi': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    'curly': ['error', 'all'],
    'quotes': ['error', 'single'],
    'max-len': ['error', { 'code': 80 }],
  },
}
