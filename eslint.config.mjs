import tanstackQuery from '@tanstack/eslint-plugin-query';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	...tanstackQuery.configs['flat/recommended'],
	globalIgnores([
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
		'node_modules/',
	]),
	prettierConfig,
	{
		plugins: {
			prettier: prettierPlugin,
			'@tanstack/query': tanstackQuery,
		},
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
				},
			},
		},
		rules: {
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'error',

			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
				},
			],

			'@typescript-eslint/no-unused-vars': [
				'error',
				{ ignoreRestSiblings: true },
			],
			'@typescript-eslint/no-array-constructor': 'error',
			'@typescript-eslint/no-duplicate-enum-values': 'error',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-extra-non-null-assertion': 'error',
			'@typescript-eslint/no-empty-object-type': 'off',
			'no-loss-of-precision': 'off',
			'@typescript-eslint/no-loss-of-precision': 'error',
			'@typescript-eslint/no-misused-new': 'error',
			'@typescript-eslint/no-namespace': 'error',
			'@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
			'@typescript-eslint/no-this-alias': 'error',
			'@typescript-eslint/no-unnecessary-type-constraint': 'error',
			'@typescript-eslint/no-unsafe-declaration-merging': 'error',
			'@typescript-eslint/no-var-requires': 'error',
			'@typescript-eslint/prefer-as-const': 'error',
			'@typescript-eslint/triple-slash-reference': 'error',
			'@typescript-eslint/no-inferrable-types': 'warn',

			'@typescript-eslint/naming-convention': [
				'error',
				{
					format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
					selector: 'variable',
					leadingUnderscore: 'allow',
				},
				{
					format: ['camelCase', 'PascalCase'],
					selector: 'function',
				},
				{
					format: ['PascalCase'],
					selector: 'interface',
				},
				{
					format: ['PascalCase'],
					selector: 'typeAlias',
				},
			],
			'@typescript-eslint/array-type': [
				'error',
				{
					default: 'array-simple',
				},
			],

			'prefer-const': 'error',
			'no-var': 'error',
			eqeqeq: [
				'error',
				'always',
				{
					null: 'ignore',
				},
			],
			'no-async-promise-executor': 'warn',

			'import/no-unresolved': 'error',
			'import/no-duplicates': 'error',
			'import/order': [
				'error',
				{
					groups: [
						['builtin', 'external'],
						['internal', 'parent', 'sibling'],
						['index', 'object', 'type'],
						'unknown',
					],
					pathGroups: [
						{
							pattern: '{react,react-dom}',
							group: 'external',
							position: 'before',
						},
						{
							pattern: '{next,next/**}',
							group: 'external',
							position: 'before',
						},
						{
							pattern: '{@/app/**,@/app}',
							group: 'internal',
							position: 'before',
						},
						{
							pattern: '{@/views/**,@/views}',
							group: 'internal',
							position: 'before',
						},
						{
							pattern: '{@/widgets/**,@/widgets}',
							group: 'internal',
							position: 'before',
						},
						{
							pattern: '{@/features/**,@/features}',
							group: 'internal',
							position: 'before',
						},
						{
							pattern: '{@/entities/**,@/entities}',
							group: 'internal',
							position: 'before',
						},
						{
							pattern: '{@/shared/**,@/shared}',
							group: 'internal',
							position: 'before',
						},
						{
							pattern:
								'{./*.module.scss,../**/*.module.scss,./*.scss,../**/*.scss}',
							group: 'unknown',
						},
					],
					pathGroupsExcludedImportTypes: ['@/**', 'src/**', 'public/**'],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: 'util',
							importNames: ['isArray'],
							message: '`Array.isArray`를 대신 사용해주세요!',
						},
					],
				},
			],
			'import/no-restricted-paths': [
				'error',
				{
					zones: [
						{
							target: './src/views',
							from: './src/app',
						},
						{
							target: './src/widgets',
							from: ['./src/app', './src/views'],
						},
						{
							target: './src/features',
							from: ['./src/app', './src/views', './src/widgets'],
						},
						{
							target: './src/entities',
							from: [
								'./src/app',
								'./src/views',
								'./src/widgets',
								'./src/features',
							],
						},
						{
							target: './src/shared',
							from: [
								'./src/app',
								'./src/views',
								'./src/widgets',
								'./src/features',
								'./src/entities',
							],
						},
					],
				},
			],

			// React 기타
			'react/prop-types': 'off',
			'react/jsx-no-target-blank': 'error',
		},
	},
]);

export default eslintConfig;
