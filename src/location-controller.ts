import {
	prepareValuesForLocation,
	getInitialValues
} from './values-controller';
import { writeQuery, readQuery } from './query-parser';

export const calculateLocationPath = () => {
	const queryValues = readQuery();
	writeQuery(joinValues(queryValues));
};

export const setQueryField = (field: string, value: any) => {
	const values = { ...readQuery() };
	values[field] = value;

	writeQuery(joinValues(values));
};

const joinValues = (locationQuery: any) => {
	const result = { ...getInitialValues() };
	Object.keys(locationQuery).forEach((key) => {
		const value = result[key] ? result[key] : true;
		if (value) {
			result[key] = locationQuery[key];
		}
	});

	return prepareValuesForLocation(result);
};
