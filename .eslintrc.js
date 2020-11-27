module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript',
    'prettier',
    'prettier/vue',
  ],
  ignorePatterns: ['**/assets/*'],
  plugins: ['vue'],
};
