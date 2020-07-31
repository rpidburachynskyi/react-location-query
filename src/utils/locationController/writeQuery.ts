import { QueryValues } from '../../types/Query';
import { compareObjects } from '../objects';
import readQuery from './readQuery';
import { stringifyQuery } from '../queryParser/queryParser';
import { getLocation, getHistory } from '../../stores/store/store';
import { sortFieldsInQuery } from './sort';
import { Context } from '../../context/context';

const writeQuery = (query: QueryValues, context: Context) => {
	const sorted = sortFieldsInQuery(query, context);
	if (compareObjects(sorted, readQuery())) return;
	const preparedQuery = stringifyQuery(sorted);

	const history = getHistory();
	const location = getLocation();

	if (Object.keys(sorted).length === 0) {
		history.replace(location.pathname);
	} else {
		history.replace(`${location.pathname}?${preparedQuery}`);
	}
};

export default writeQuery;
