import qs from 'querystring';
import { normalizeValues, getInitialValuesWrappers } from './values-controller';
import { InitialValues } from './types/Initial';
import { getLocation, getHistory } from './store';
import { QueryObject, QueryValues } from './types/Query';
import { Location } from './types';

export const extractQueryByInitialValues = (
	query: any,
	defaultValues: InitialValues
): QueryValues => {
	const result: QueryValues = {};
	Object.keys(defaultValues).forEach((key) => {
		result[key] = query[key] ? query[key] : defaultValues[key];
	});

	return result;
};

export const parseQuery = (query: string) => {
	return qs.parse(query === '' ? '' : query.substring(1));
};

export const stringifyQuery = (query: QueryValues) => {
	return qs.stringify(normalizeValues(query));
};

export const readQuery = (): QueryObject => {
	const location: Location = getLocation();
	return parseQuery(location.search);
};

export const writeQuery = (query: InitialValues) => {
	const history = getHistory();
	const location = getLocation();

	if (Object.keys(query).length === 0) {
		history.replace(location.pathname);
	} else {
		history.replace(
			`${location.pathname}?${stringifyQuery(
				sortFieldsInQuery(normalizeValues(query))
			)}`
		);
	}
};

const sortFieldsInQuery = (query: object) => {
	const defaultValues = getInitialValuesWrappers();

	const result = {};
	const keys = Object.keys(query);
	const sortedKeys = keys.sort((a: string, b: string) => {
		const indexA = defaultValues.find((value) => !!value[a]);
		const indexB = defaultValues.find((value) => !!value[b]);
		if (!indexA || !indexB) return 0;

		return indexA.index - indexB.index;
	});

	sortedKeys.forEach((key) => {
		result[key] = query[key];
	});

	return result;
};
