import { QueryValues } from '../../types/Query';
import readQuery from './readQuery';
import { stringifyQuery } from '../queryParser/queryParser';
import { getLocation, getHistory } from '../../stores/store/store';
import { sortFieldsInQuery } from './sort';
import { Context } from '../../context/context';
import { ActionOnChange } from '../../types/ActionOnChange';

export const writeQuery = (
	query: QueryValues,
	context: Context,
	actionOnChange: ActionOnChange
) => {
	const sorted = sortFieldsInQuery(query, context);
	if (stringifyQuery(sorted) === stringifyQuery(readQuery())) return;
	const preparedQuery = stringifyQuery(sorted);

	const history = getHistory();
	const location = getLocation();

	const action =
		actionOnChange === ActionOnChange.Push ? history.push : history.replace;

	if (Object.keys(sorted).length === 0) {
		action(location.pathname);
	} else {
		action(`${location.pathname}?${preparedQuery}`);
	}
};
