import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import vuePlugin from 'eslint-plugin-vue'
import globals from 'globals'

const { browser, node } = globals

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...browser,
        ...node,
        defineProps: 'readonly',
        defineEmits: 'readonly',
        withDefaults: 'readonly',
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...vuePlugin.configs['vue3-recommended'].rules,
      ...tsPlugin.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
]