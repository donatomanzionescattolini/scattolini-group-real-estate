module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'android', 'ios'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
        // The Desarrollo/Area data models intentionally use `[key: string]: any`
        // (see AGENTS.md). Enforcing no-explicit-any fights the documented design.
        '@typescript-eslint/no-explicit-any': 'off',
        // Surface unused variables without blocking the build; allow `_`-prefixed
        // throwaway bindings (common for intentionally-ignored args/catches).
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_'},
        ],
    },
}
