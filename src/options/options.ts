interface Options {
	sortingOptions: {
		sortBy: 'index' | 'alphabet' | 'fieldLength';
		sortOrder: 'asc' | 'desc';
	};
	defaultOptions: {
		hideIfDefault: boolean;
		replaceValueWhenParsedError: boolean;
	};

	removeUnusedQueryFields: boolean;
}

const _options: Options = {
	sortingOptions: {
		sortBy: 'index',
		sortOrder: 'asc'
	},
	defaultOptions: {
		hideIfDefault: false,
		replaceValueWhenParsedError: true
	},
	removeUnusedQueryFields: false
};

export const setOptions = (options: Partial<Options>) => {
	Object.assign(_options, options);
};

export const getOptions = () => _options;

export const getSortingOptions = () => _options.sortingOptions;
export const getDefaultOptions = () => _options.defaultOptions;
