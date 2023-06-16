module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'global-require': 'error',
    'import/extensions': ['error', 'always', { ignorePackages: true }],
    'no-use-before-define': ['error', { variables: false }],
    'prettier/prettier': 'error',
  },
};
