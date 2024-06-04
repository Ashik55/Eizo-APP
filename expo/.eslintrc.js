module.exports = {
	plugins: ["react", "react-native"],
	extends: [
		"plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
		"plugin:import/recommended",
		"plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		"plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
		"plugin:react-native/all",
	],
	parser: "@typescript-eslint/parser", // Specifies the ESLint parser
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: "module", // Allows for the use of imports
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
		},
	},
	settings: {
		react: {
			version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
		},
		"import/resolver": {
			"babel-module": {},
		},
	},
	rules: {
		"@typescript-eslint/no-unused-vars": [1, { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
		"@typescript-eslint/no-unused-expressions": 2,
		"@typescript-eslint/no-empty-function": 0,
		"@typescript-eslint/explicit-module-boundary-types": 0,
		"@typescript-eslint/no-var-requires": 0,
		"@typescript-eslint/ban-types": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/ban-ts-comment": 0,
		"@typescript-eslint/no-non-null-assertion": 0,
		"no-unused-expressions": 0,
		"no-use-before-define": 0,
		"no-undef": 0,
		"array-callback-return": 0,
		"react/prop-types": 0,
		"react/jsx-handler-names": 0,
		"react/jsx-indent": 0,
		"react/no-children-prop": 0,
		"max-params": ["error", 4],
		"react/jsx-key": 0,
		"import/namespace": 0,
		"import/named": 0,
		"import/no-named-as-default": 0,
		"prettier/prettier": 0,
		"import/no-unresolved": 0,
		"import/default": 0,
		"import/no-duplicates": 0,
		"import/no-named-as-default-member": 0,
		"react/no-deprecated": 0,
		"react/display-name": 0,
		"react/no-string-refs": 0,
		"react/no-direct-mutation-state": 0,
		"react/require-render-return": 0,
		"react/no-unescaped-entities": 0,
		"react-native/no-unused-styles": 2,
		"react-native/sort-styles": 0,
		"react-native/no-inline-styles": 0,
		"react/react-in-jsx-scope": "off",
		"react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
	},
}
