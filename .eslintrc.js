module.exports = {
    extends: ['react-app', 'react-app/jest'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
    },
    parserOptions: {
      project: './tsconfig.json',
    },
  };