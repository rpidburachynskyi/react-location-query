import { QueryValue, QueryValues } from '../../types/Query';
import { normalizeForLocation } from '../normalizer/normalizer';
import readQuery from '../queryParser/readQuery';
import writeQuery from './writeQuery';

export const calculateLocationPath = (context: object) => {
	const queryValues = readQuery();
	const normalizedQuery: QueryValues = normalizeForLocation({
		...queryValues,
		...context
	});

	writeQuery(normalizedQuery);
};

export const setQueryField = (
	field: string,
	value: QueryValue,
	context: object
) => {
	context[field] = value;
	calculateLocationPath(context);
};
