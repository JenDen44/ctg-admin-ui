import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default defineConfig([
    {
        ignores: ['dist', 'build', 'coverage', '**/*.d.ts'],
    },
    js.configs.recommended,
    {
        plugins: {
            import: importPlugin,
            '@typescript-eslint': tsPlugin,
            react: reactPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: prettierPlugin,
            '@tanstack/query': pluginQuery,
        },

        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                NullOr: 'readonly',
            },
            ecmaVersion: 'latest',
            sourceType: 'module',
        },

        settings: {
            react: { version: 'detect' },
            'import/resolver': {
                typescript: true,
            },
        },

        rules: {
            'react-refresh/only-export-components': 'warn',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 2],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
            ],
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    disallowTypeAnnotations: true,
                    fixStyle: 'separate-type-imports',
                },
            ],
            quotes: ['error', 'single', { avoidEscape: true }],
            'jsx-quotes': ['error', 'prefer-double'],
            semi: ['error', 'always'],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'max-len': [
                'warn',
                {
                    code: 120,
                    tabWidth: 4,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreComments: true,
                    ignoreRegExpLiterals: true,
                },
            ],
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
                    'newlines-between': 'never',
                    distinctGroup: true,
                },
            ],
            'import/newline-after-import': ['error', { count: 1 }],
            'no-duplicate-imports': 'off',
            'import/no-duplicates': ['error', { considerQueryString: true, 'prefer-inline': false }],
            'object-curly-spacing': ['error', 'always'],
            'object-curly-newline': [
                'error',
                {
                    ImportDeclaration: { multiline: true, minProperties: 999 },
                    ExportDeclaration: { multiline: true, minProperties: 999 },
                },
            ],
            'prettier/prettier': [
                'error',
                {
                    printWidth: 120,
                    tabWidth: 4,
                    useTabs: false,
                    singleQuote: true,
                    trailingComma: 'all',
                },
            ],

            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: ['typeAlias', 'interface'],
                    format: ['PascalCase'],
                    custom: { regex: '^T[A-Z]', match: true },
                },
            ],
        },
    },
    prettierConfig,

    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        rules: {
            curly: ['error', 'all'],
            'brace-style': ['error', '1tbs', { allowSingleLine: false }],
        },
    },
]);
