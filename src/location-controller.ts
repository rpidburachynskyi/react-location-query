import { getInitialValues } from './values-controller';
import { writeQuery, readQuery } from './query-parser';
import { QueryValue } from './types/Query';

export const calculateLocationPath = () => {
	const queryValues = readQuery();
	writeQuery({ ...(getInitialValues() as any), ...queryValues });
};

export const setQueryField = (field: string, value: QueryValue) => {
	const queryValues = { ...readQuery() };
	queryValues[field] = value;
	writeQuery({ ...(getInitialValues() as any), ...queryValues });
};

export const setQueryFieldImmidiatly = (field: string, value: QueryValue) => {
	console.log(value);
	const queryValues = { ...readQuery() };
	queryValues[field] = value;
	writeQuery({ ...(getInitialValues() as any), ...queryValues });
};
