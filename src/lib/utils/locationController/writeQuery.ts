import readQuery from './readQuery';
import { stringifyQuery } from '../queryParser/queryParser';
import { sortFieldsInQuery } from './sort/sort';
import { Context } from '../../context/context';
import { QueryValues } from '../../types/Query';
import { ActionOnChange } from '../../types/ActionOnChange';
import { getHistory, getLocation } from '../../stores/store/store';

export const writeQuery = (
	query: QueryValues,
	context: Context,
	actionOnChange: ActionOnChange
) => {
	const sorted = sortFieldsInQuery(query, context);
	if (
		stringifyQuery(sorted, context.cryptoOptions) ===
		stringifyQuery(readQuery(context.cryptoOptions), context.cryptoOptions)
	)
		return;
	const preparedQuery = stringifyQuery(sorted, context.cryptoOptions);

	const history = getHistory();
	const location = getLocation();

	const action = actionOnChange === 'Push' ? history.push : history.replace;

	if (Object.keys(sorted).length === 0) {
		action(location.pathname);
	} else {
		action(`${location.pathname}?${preparedQuery}`);
	}
};
