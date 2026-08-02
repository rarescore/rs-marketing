import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist/**', 'node_modules/**', '.qa/**'] },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } }, globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: { ...js.configs.recommended.rules, ...reactHooks.configs.flat.recommended.rules, ...reactRefresh.configs.vite.rules, 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }] },
  },
  {
    files: ['api/**/*.js', 'scripts/**/*.mjs', 'vite.config.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: { ...globals.node, document: 'readonly' } },
    rules: js.configs.recommended.rules,
  },
]
