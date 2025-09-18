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

    // База для JS
    js.configs.recommended,

    // Проектные правила
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
                // project: ['./tsconfig.json'],
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            ecmaVersion: 'latest',
            sourceType: 'module',
        },

        settings: {
            react: { version: 'detect' },
            // чтобы plugin-import понимал TS-алиасы
            'import/resolver': {
                typescript: true,
            },
        },

        rules: {
            /* React Refresh (для Vite HMR) */
            'react-refresh/only-export-components': 'warn',

            /* Хуки React */
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            /* JSX */
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 2],

            /* TS */
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
            ],
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    disallowTypeAnnotations: true,
                    fixStyle: 'separate-type-imports', // <-- выносит типы в отдельный import type
                },
            ],

            /* Формат и стиль */
            // indent: ['error', 4, { SwitchCase: 1, ignoredNodes: ['JSXElement *'] }],
            quotes: ['error', 'single', { avoidEscape: true }],
            'jsx-quotes': ['error', 'prefer-double'],
            semi: ['error', 'always'],
            'no-console': ['warn', { allow: ['warn', 'error'] }],

            /* Длина строки 120 — переносы делает Prettier */
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

            /* Сортировка импортов: type-импорты — отдельной группой и ниже */
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling', 'index'],
                        'type', // ⬅️ типы
                    ],
                    'newlines-between': 'never',
                    // гарантирует, что type будет всегда отделён
                    distinctGroup: true,
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],

            // Один пустой рядок после блока импортов
            'import/newline-after-import': ['error', { count: 1 }],

            // Не используем core-правило, чтобы не конфликтовать с TS-типами
            'no-duplicate-imports': 'off',
            'import/no-duplicates': ['error', { considerQueryString: true, 'prefer-inline': false }],

            /* Пробелы и переносы внутри фигурных скобок для import {...} */
            'object-curly-spacing': ['error', 'always'],
            'object-curly-newline': [
                'error',
                {
                    // Держим импорт в одну строку, если влезает.
                    // Когда строка > 120 — Prettier сам перенесёт.
                    ImportDeclaration: { multiline: true, minProperties: 999 },
                    ExportDeclaration: { multiline: true, minProperties: 999 },
                },
            ],

            /* Делегируем форматирование Prettier'у */
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
        },
    },

    // TS-специфические (по желанию)
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {},
    },

    // ⬇️ ДОЛЖЕН быть последним: отключает конфликтующие с Prettier правила
    prettierConfig,
]);
