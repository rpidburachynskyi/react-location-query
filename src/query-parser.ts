import qs from 'querystring';
import { normalizeValues, getInitialValuesWrappers } from './values-controller';
import { InitialValues, Location, History } from './types';
import { getLocation } from './store';

export const extractQueryByInitialValues = (
	query: any,
	defaultValues: InitialValues
) => {
	const result: object = {};
	Object.keys(defaultValues).forEach((key) => {
		result[key] = query[key] ? query[key] : defaultValues[key];
	});

	return result;
};

export const parseQuery = (query: string) => {
	return qs.parse(query === '' ? '' : query.substring(1));
};

export const stringifyQuery = (query: InitialValues) => {
	return qs.stringify(normalizeValues(query));
};

export const readQuery = (defaultValues: InitialValues) => {
	const location: Location = getLocation();
	return { ...defaultValues, ...parseQuery(location.search) };
};

export const writeQuery = (
	location: Location,
	history: History,
	query: InitialValues
) => {
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

	const { sortOrder } = { sortOrder: 'asc' };
	const sortAsserting = (a: string, b: string) => {
		const indexA = defaultValues.find((value) => !!value[a]);
		const indexB = defaultValues.find((value) => !!value[b]);
		if (!indexA || !indexB) return true;

		return indexA.index - indexB.index;
	};
	const result = {};
	const keys = Object.keys(query);
	const sortedKeys = keys.sort((a, b) =>
		sortAsserting(a, b)
			? sortOrder === 'asc'
				? 1
				: -1
			: sortOrder === 'asc'
			? -1
			: 1
	);
	sortedKeys.forEach((key) => {
		result[key] = query[key];
	});
	return result;
};
