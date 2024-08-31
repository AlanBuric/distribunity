import eslintPluginVue from 'eslint-plugin-vue'
import jseslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(jseslint.configs.recommended, ...tseslint.configs.recommended, ...eslintPluginVue.configs['flat/recommended'], {
  ignores: ['**/*.d.ts', 'node_modules/', 'dist/'],
  files: ['*.vue', '**/*.vue'],
  languageOptions: {
    parserOptions: {
      parser: '@typescript-eslint/parser'
    },
  },
  rules: {
    'vue/max-attributes-per-line': 'off',
    '@typescript-eslint/no-unused-vars': 'warn'
  },
});
