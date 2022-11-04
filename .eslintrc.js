module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-unused-expressions':'off',
    'no-void':'off',
    'no-sequences':'off'
  },
  globals: {
    'drift': 'readonly'
  }
}
