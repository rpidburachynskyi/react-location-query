import {
	getInitialValues,
	getInitialValuesWrappers
} from '../valuesController/valuesController';
import { writeQuery, readQuery } from '../queryParser/queryParser';
import { QueryValue, QueryValues } from '../../types/Query';
import { getSortingOptions } from '../../stores/options/options';
import { normalizeForLocation } from '../normalizer/normalizer';
import { InitialExtendValuesWrappers } from '../../types/Initial/Wrapper';

export const pushQuery = (queryValues: QueryValues) => {
	const normalizedQuery: QueryValues = normalizeForLocation({
		...getInitialValues(),
		...queryValues
	});
	writeQuery(sortFieldsInQuery(normalizedQuery));
};

export const calculateLocationPath = () => {
	const queryValues = readQuery();
	pushQuery(queryValues);
};

export const setQueryField = (field: string, value: QueryValue) => {
	const queryValues = { ...readQuery() };
	queryValues[field] = value;
	pushQuery(queryValues);
};

export const setQueryFieldImmidiatly = (field: string, value: QueryValue) => {
	const queryValues = { ...readQuery() };
	queryValues[field] = value;
	pushQuery(queryValues);
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
