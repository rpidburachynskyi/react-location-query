import {
	prepareValuesForLocation,
	getInitialValues
} from './values-controller';
import { parseQuery, writeQuery } from './query-parser';
import { Location, History, InitialValues } from './types';

export const calculateLocationPath = (location: Location, history: History) => {
	const queryValues = parseQuery(location.search);
	const defaultValues = getInitialValues();
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

	const defaultValues = getInitialValues();

	writeQuery(location, history, joinValues(defaultValues, values));
};

const joinValues = (defaultValues: InitialValues, locationQuery: any) => {
	const result = { ...defaultValues };
	Object.keys(locationQuery).forEach((key) => {
		const value = result[key] ? result[key] : true;
		if (value) {
			result[key] = locationQuery[key];
		}
	});

	return prepareValuesForLocation(result, defaultValues);
};
