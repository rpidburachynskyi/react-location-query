import { QueryValues } from '../../types/Query';
import { compareObjects } from '../objects';
import readQuery from '../queryParser/readQuery';
import { stringifyQuery } from '../queryParser/queryParser';
import { getLocation, getHistory } from '../../stores/store/store';
import { sortFieldsInQuery } from './sort';

const writeQuery = (query: QueryValues) => {
	const sorted = sortFieldsInQuery(query);
	console.log(sorted, readQuery());
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
