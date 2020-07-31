import { QueryValue, QueryValues } from '../../types/Query';
import { normalizeForLocation } from '../normalizer/normalizer';
import readQuery from './readQuery';
import { Context } from '../../context/context';
import { ActionOnChange } from '../../types/ActionOnChange';
import { writeQuery } from './writeQuery';

export const calculateLocationPath = (
	context: Context,
	actionOnChange: ActionOnChange
) => {
	const queryValues = readQuery(context.options);
	const normalizedQuery: QueryValues = normalizeForLocation(
		{
			...queryValues,
			...context.query
		},
		context
	);

	writeQuery(normalizedQuery, context, actionOnChange);
};

export const setQueryFieldValue = (
	field: string,
	value: QueryValue,
	context: Context,
	actionOnChange: ActionOnChange
) => {
	context.query[field] = value;
	calculateLocationPath(context, actionOnChange);
};
