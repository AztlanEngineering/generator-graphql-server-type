module.exports = {
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.config.js'
      }
    }
  },
  'env': {
    'browser': true,
    'node': true,
    'commonjs': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'parser': 'babel-eslint',
  'plugins': [
    'babel'
  ],
  'rules': {
    'indent': [
      'error',
			2,
			{'ignoredNodes': ['JSXElement']}
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
			"single",
			{ "allowTemplateLiterals": true }
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-trailing-spaces': [
      'error', { 'skipBlankLines': false }
    ],
    'no-console': 0,
    'array-bracket-newline': [
      'error', 'consistent'
    ],
    'multiline-comment-style': [
      'error', 'bare-block'
    ],
    'jsx-quotes': [
      'error', 'prefer-single'
    ],
    'no-tabs': [
      'error', { 'allowIndentationTabs': false }
    ],
    'no-mixed-spaces-and-tabs': [
      'error'
    ],
		'no-unused-vars' :[
			"warn"
		],
  }
}

