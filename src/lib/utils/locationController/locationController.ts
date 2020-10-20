import { normalizeForLocation } from '../normalizer/normalizer';
import readQuery from './readQuery';
import { ActionOnChange } from '../../types/ActionOnChange';
import { writeQuery } from './writeQuery';
import { Context } from '../../context/context';
import { QueryValues, QueryValue } from '../../types/Query';
import { getInitialValuesWrapper } from '../valuesController/valuesController/valuesController';

export const calculateLocationPath = (
	context: Context,
	actionOnChange: ActionOnChange,
	force: boolean = false
) => {
	const queryValues = readQuery(context.cryptoOptions);
	const normalizedQuery: QueryValues = normalizeForLocation(
		{
			...queryValues,
			...context.query
		},
		context
	);

	writeQuery(normalizedQuery, context, actionOnChange, force);
};

export const setQueryFieldValue = (
	field: string,
	value: QueryValue,
	context: Context,
	actionOnChange: ActionOnChange
) => {
	const wrapper = getInitialValuesWrapper(field, context);

	if (!wrapper) return;

	const { initialValue } = wrapper;
	if (!initialValue.active) return;

	const { active } = initialValue;
	if (
		typeof active === 'object' &&
		!active.isActive &&
		!active.canChangeValue
	)
		return;

	context.query[field] = value;
	calculateLocationPath(context, actionOnChange, true);
};
