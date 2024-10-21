import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import airbnbConfig from 'eslint-config-airbnb'
import airbnbConfigTs from 'eslint-config-airbnb-typescript'
import eslintReactRefresh from 'eslint-plugin-react-refresh'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-refresh': eslintReactRefresh,
      prettier: prettierPlugin,
    },
  },
  {
    ignores: ['dist', 'node_modules', 'eslint.config.js'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      ...airbnbConfig.configs,
      ...airbnbConfigTs.configs,
    },
  }
)
