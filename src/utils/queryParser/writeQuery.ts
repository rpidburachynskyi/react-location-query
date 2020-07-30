import { QueryValues } from '../../types/Query';
import { compareObjects } from '../objects';
import readQuery from './readQuery';
import { stringifyQuery } from './queryParser';
import { getLocation, getHistory } from '../../stores/store/store';

const writeQuery = (query: QueryValues) => {
	if (compareObjects(query, readQuery())) return;
	const preparedQuery = stringifyQuery(query);
	const history = getHistory();
	const location = getLocation();
	if (Object.keys(query).length === 0) {
		history.replace(location.pathname);
	} else {
		history.replace(`${location.pathname}?${preparedQuery}`);
	}
};

export default writeQuery;
