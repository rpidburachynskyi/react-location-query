import { QueryValue, QueryValues } from '../../types/Query';
import { normalizeForLocation } from '../normalizer/normalizer';
import readQuery from './readQuery';
import writeQuery from './writeQuery';
import { Context } from '../../context/context';

export const calculateLocationPath = (context: Context) => {
	const queryValues = readQuery();
	const normalizedQuery: QueryValues = normalizeForLocation(
		{
			...queryValues,
			...context.query
		},
		context
	);

	writeQuery(normalizedQuery, context);
};

export const setQueryFieldValue = (
	field: string,
	value: QueryValue,
	context: Context
) => {
	context.query[field] = value;
	calculateLocationPath(context);
};
