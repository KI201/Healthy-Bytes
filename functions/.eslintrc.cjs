module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'google',
    'plugin:node/recommended',
  ],
  rules: {
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
    'quotes': ['error', 'double', { 'allowTemplateLiterals': true }],
    'no-undef': 'off',
    'no-unused-vars': 'warn',
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      env: {
        mocha: true,
      },
      rules: {},
    },
    // Disable no-undef rule for functions directory to prevent issues with module and process
    {
      files: ['functions/**/*.js'],
      rules: {
        'no-undef': 'off', // Disable the rule that flags module and process as undefined
      },
    },
  ],
  globals: {
    module: 'readonly',
    process: 'readonly',
  },
};