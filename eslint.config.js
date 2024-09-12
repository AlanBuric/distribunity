import esLintJs from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import tsEsLint from 'typescript-eslint';
import stylisticEslint from '@stylistic/eslint-plugin';
import vueParser from 'vue-eslint-parser';

export default tsEsLint.config(
  esLintJs.configs.recommended,
  ...tsEsLint.configs.recommended,
  stylisticEslint.configs['recommended-flat'],
  ...eslintPluginVue.configs['flat/strongly-recommended'],
  {
    ignores: [
      '**/*.d.ts',
      'node_modules/',
      'dist/',
    ],
    files: ['**/*.{ts,js,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueParser,
      parserOptions: {
        parser: tsEsLint.parser,
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': 'off',
      '@stylistic/brace-style': ['warn', '1tbs'],
      '@stylistic/comma-dangle': 'warn',
      'vue/script-indent': [
        'warn',
        2,
        {
          baseIndent: 1,
        },
      ],
      'vue/html-indent': [
        'warn',
        2,
        {
          baseIndent: 1,
        },
      ],
      'vue/first-attribute-linebreak': ['warn', {
        singleline: 'beside',
      }],
      'vue/max-attributes-per-line': [
        'warn',
        {
          singleline: 3,
          multiline: 3,
        },
      ],
      'vue/require-explicit-emits': 'off',
    },
  },
);
