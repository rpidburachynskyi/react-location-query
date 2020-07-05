import {
	getDefaultValues,
	prepareValuesForLocation
} from './values-controller';
import { parseQuery, writeQuery } from './query-parser';
import { Location, History, DefaultValues } from './types';

export const calculateLocationPath = (location: Location, history: History) => {
	const queryValues = parseQuery(location.search);
	const defaultValues = getDefaultValues();

	writeQuery(location, history, joinValues(defaultValues, queryValues));
};

export const setQueryField = (
	location: Location,
	history: History,
	field: string,
	value: any
) => {
	const values = { ...parseQuery(location.search) };
	values[field] = value;
	writeQuery(location, history, values);
};

const joinValues = (defaultValues: DefaultValues, locationQuery: any) => {
	const result = { ...defaultValues };
	Object.keys(locationQuery).forEach((key) => {
		const value = result[key];
		if (value) {
			result[key] = locationQuery[key];
		}
	});

	return prepareValuesForLocation(result, defaultValues);
};
