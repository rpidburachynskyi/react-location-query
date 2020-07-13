import qs from 'querystring';
import {
	InitialExtendValues,
	InitialExtendValuesWrappers
} from './types/Initial/Initial';
import { getLocation, getHistory } from './store';
import { QueryValues } from './types/Query';
import { Location } from './types';
import { normalizeForLocation } from './utils/normalizer/normalizer';
import { getInitialValuesWrappers } from './values-controller';
import { getSortingOptions } from './options/options';

export const extractQueryByInitialValues = (
	query: any,
	defaultValues: InitialExtendValues
): QueryValues => {
	const result: QueryValues = {};
	Object.keys(defaultValues).forEach((key) => {
		result[key] =
			query[key] !== undefined ? query[key] : defaultValues[key];
	});
	return result;
};

export const parseQuery = (query: string): QueryValues => {
	return qs.parse(query === '' ? '' : query.substring(1));
};

export const stringifyQuery = (query: QueryValues) => {
	return qs.stringify(query as any);
};

export const readQuery = (): QueryValues => {
	const location: Location = getLocation();
	return parseQuery(location.search);
};

export const writeQuery = (query: InitialExtendValues | QueryValues) => {
	const history = getHistory();
	const location = getLocation();

	if (Object.keys(query).length === 0) {
		history.replace(location.pathname);
	} else {
		history.replace(
			`${location.pathname}?${stringifyQuery(
				sortFieldsInQuery(normalizeForLocation(query))
			)}`
		);
	}
};

const sortFieldsInQuery = (query: object) => {
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
