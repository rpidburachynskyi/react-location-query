import {
	prepareValuesForLocation,
	getInitialValues
} from './values-controller';
import { parseQuery, writeQuery } from './query-parser';
import { Location, History, InitialValues } from './types';
import { getLocation, getHistory } from './store';

export const calculateLocationPath = () => {
	const location: Location = getLocation();
	const history: History = getHistory();

	const queryValues = parseQuery(location.search);
	const defaultValues = getInitialValues();
	writeQuery(location, history, joinValues(defaultValues, queryValues));
};

export const setQueryField = (field: string, value: any) => {
	const location: Location = getLocation();
	const history: History = getHistory();

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
