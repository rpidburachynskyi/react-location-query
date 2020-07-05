import qs from 'querystring';
import { normalizeValues } from './values-controller';
import { DefaultValues, Location, History } from './types';

export const extractQueryByDefaultValues = (
	query: any,
	defaultValues: DefaultValues
) => {
	const result: any = {};
	Object.keys(defaultValues).forEach((key) => {
		result[key] = query[key] ? query[key] : defaultValues[key];
	});

	return result;
};

export const parseQuery = (query: string) => {
	return qs.parse(query === '' ? '' : query.substring(1));
};

export const stringifyQuery = (query: object) => {
	return qs.stringify({ ...normalizeValues(query) });
};

export const readQuery = (location: Location, defaultValues: DefaultValues) => {
	return { ...defaultValues, ...parseQuery(location.search) };
};

export const writeQuery = (
	location: Location,
	history: History,
	query: object
) => {
	if (Object.keys(query).length === 0) {
		history.replace(location.pathname);
	} else {
		history.replace(
			`${location.pathname}?${stringifyQuery(normalizeValues(query))}`
		);
	}
};
