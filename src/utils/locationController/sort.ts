import { getSortingOptions } from '../../stores/options/options';
import { getInitialValuesWrappers } from '../valuesController/valuesController/valuesController';
import { InitialExtendValuesWrappers } from '../../types/Initial/Wrapper';

export const sortFieldsInQuery = (query: object) => {
	const result = {};

	const sortedKeys = sortBy(Object.keys(query));
	(getSortingOptions().sortOrder === 'asc'
		? sortedKeys
		: sortedKeys.reverse()
	).forEach((key) => {
		result[key] = query[key];
	});

	return result;
};

const sortBy = (queryKeys: string[]): string[] => {
	switch (getSortingOptions().sortBy) {
		case 'index':
			return queryKeys.sort(sortByIndex(getInitialValuesWrappers()));
		case 'alphabet':
			return queryKeys.sort(sortByAlphabet);
		case 'fieldLength':
			return queryKeys.sort(sortByFieldLength);
	}
};

const sortByIndex = (defaultValuesWrappers: InitialExtendValuesWrappers) => (
	a: string,
	b: string
) => {
	const indexA = defaultValuesWrappers[a];
	const indexB = defaultValuesWrappers[b];
	if (!indexA || !indexB) return 0;

	return indexA.index - indexB.index;
};

const sortByAlphabet = (a: string, b: string) => {
	if (a === b) return 0;
	return a > b ? 1 : -1;
};

const sortByFieldLength = (a: string, b: string) => {
	return a.length - b.length;
};
