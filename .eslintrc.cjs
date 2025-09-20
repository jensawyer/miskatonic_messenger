/* eslint-env node */
module.exports = {
    root: true,
    env: { browser: true, es2022: true, node: true },
    parser: '@typescript-eslint/parser',
    parserOptions: { project: false, ecmaVersion: 'latest', sourceType: 'module' },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier'
    ],
    settings: {
        react: { version: 'detect' },
        'import/resolver': { typescript: true }
    },
    rules: {
        // Mild opinions that keep things neat without being annoying
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/order': ['warn', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    },
    ignorePatterns: ['dist', 'node_modules', 'coverage'],
    overrides: [
        // Disallow raw JSX files; we use TSX only
        {
            files: ['**/*.jsx'],
            rules: {
                'no-restricted-syntax': ['error', { selector: 'Program', message: 'Use .tsx instead of .jsx' }],
            },
        },
        // Ensure JSX only appears in .tsx files
        {
            files: ['**/*.{ts,tsx}'],
            rules: {
                'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
            },
        },
    ]

}
