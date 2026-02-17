import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import globals from 'globals';

export default [
    {
        ignores: [
            'dist/*',
            'example/*',
            'website/*',
            'jest.config.cjs',
            'jest.setup.ts',
            '**/*.spec.ts',
        ],
    },
    eslint.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
                google: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            'eslint-plugin-tsdoc': tsdocPlugin,
            prettier: prettierPlugin,
            import: importPlugin,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...prettierConfig.rules,
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/ban-types': 'error',
            '@typescript-eslint/no-this-alias': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            'no-case-declarations': 'off',
            'no-prototype-builtins': 'off',
            'max-len': 'off',
            'max-lines': 'off',
        },
        settings: {
            'import/resolver': {
                typescript: true,
                node: true,
            },
        },
    },
];
