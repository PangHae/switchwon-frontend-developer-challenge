module.exports = {
	'*.{ts,tsx}': (filenames) => {
		return [
			`eslint --fix ${filenames.map((f) => `"${f}"`).join(' ')}`,
			`prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
		];
	},
	'*.{json,md,css,scss}': (filenames) => {
		return `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`;
	},
};
