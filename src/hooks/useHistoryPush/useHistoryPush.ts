import { useHistory } from 'react-router-dom';
import { stringifyQuery } from '../../utils/queryParser/queryParser';

const useHistoryPush = (replace = false) => {
	const history = useHistory();

	const push = (path: string, values: {}) => {
		const action = replace ? history.replace : history.push;
		if (Object.keys(values).length === 0) {
			return action(path);
		}
		const query = stringifyQuery(values);
		return action(`${path}?${query}`);
	};

	return push;
};

export default useHistoryPush;
