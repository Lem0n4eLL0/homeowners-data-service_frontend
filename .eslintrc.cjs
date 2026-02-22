module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },

  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:jsx-a11y/recommended', 'prettier', 'plugin:storybook/recommended'],

  settings: {
    react: {
      version: 'detect',
    },
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.eslint.json',
  },

  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'unused-imports',
  ],

  ignorePatterns: ['dist', 'build', 'node_modules', 'public', 'vite.config.ts', 'vitest.shims.d.ts'],

  rules: {
    // React правила
    'react/react-in-jsx-scope': 'off',  // ← Не нужно в React 17+
    'react/prop-types': 'off',  // ← TypeScript вместо PropTypes
    'react/display-name': 'off',

    // TypeScript правила
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',  // ← Отключаем, используем ниже

    // Авто-удаление неиспользуемых импортов
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      },
    ],

    // Дополнительные правила
    'prefer-const': 'warn',
    'no-console': 'warn',
    'eqeqeq': ['warn', 'always'],
  },
}
