import { normalizeForLocation } from '../normalizer/normalizer';
import readQuery from './readQuery';
import { ActionOnChange } from '../../types/ActionOnChange';
import { writeQuery } from './writeQuery';
import { Context } from '../../context/context';
import { QueryValues, QueryValue } from '../../types/Query';

export const calculateLocationPath = (
	context: Context,
	actionOnChange: ActionOnChange
) => {
	const queryValues = readQuery(context.cryptoOptions);
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
