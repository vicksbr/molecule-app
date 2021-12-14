module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    'semi': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/semi': ['warn', 'never'],
    '@typescript-eslint/member-delimiter-style': ['warn', {
      'multiline': {
        'delimiter': 'none',
        'requireLast': false
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': false
      },
      'multilineDetection': 'brackets'
    }],
    'no-trailing-spaces': ['warn', { ignoreComments: true }],
    'no-empty': ['warn', { 'allowEmptyCatch': true }]
  }
}
