import { Options } from '../../types/Options/Options';

const _options: Options = {
	sortingOptions: {
		sortBy: 'index',
		sortOrder: 'asc'
	},
	defaultOptions: {
		hideIfDefault: false,
		replaceValueWhenParsedError: true
	},
	removeUnusedQueryFields: false,
	crypto: false
};

export const setOptions = (options: Partial<Options>) => {
	Object.assign(_options, options);
};

export const getOptions = () => _options;

export const getSortingOptions = () => _options.sortingOptions;
export const getDefaultOptions = () => _options.defaultOptions;
