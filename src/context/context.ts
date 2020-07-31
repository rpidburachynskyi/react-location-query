import { createContext } from 'react';
import { InitialExtendValuesWrappers } from '../types/Initial/Wrapper';
import { SortOptions } from '../stores/options/types/SortOptions';
import { DefaultOptions } from '../stores/options/types/DefaultOptions';
import Options from '../types/Options';

export interface Context {
	query: object;
	initialValuesWrappers: InitialExtendValuesWrappers[];

	sortOptions: SortOptions;
	defaultOptions: DefaultOptions;
	options: Options;
}

const InitialContextType: Context = {
	initialValuesWrappers: [],
	query: {},
	sortOptions: {
		sortBy: 'index',
		sortOrder: 'asc'
	},
	defaultOptions: {
		hideIfDefault: false,
		replaceValueWhenParsedError: true
	},
	options: {
		crypto: false,
		removeUnusedQueryFields: true
	}
};

const Context = createContext<Context>(InitialContextType);

export default Context;
