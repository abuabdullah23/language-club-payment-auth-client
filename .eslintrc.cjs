module.exports = {
  env: {
    browser: true, es2020: true, es2022: true, "node": true,
    "amd": true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },

  // we can use any command below:
  // Method 1:
  // eslint-disable-next-line no-unused-vars
  // const : modal = new VanillaModal({
  //   modal: '.c-modal',
  //   modalInner: '.js-modal__inner',
  //   modalContent: '.js-modal__content',
  //   open: '[rel="js-modal:open"]',
  //   close: '[rel="js-modal:close"]',
  //   class: 'js-modal--visible',
  //   loadClass: 'js-modal--loaded',
  // }),

  // Method 2:
  "no-unused-vars": ["warn", { "varsIgnorePattern": "VARIABLE_NAME"}]
}
