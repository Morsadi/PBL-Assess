module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', "prettier"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': 0,
    'arrow-parens': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'global-require': 0,
    indent: ['error', 2],
    'jsx-a11y/no-static-element-interactions': 0,
    'react/no-array-index-key': 0,
    'react/prop-types': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'guard-for-in': 0,


  },
  parser: 'babel-eslint',
};
