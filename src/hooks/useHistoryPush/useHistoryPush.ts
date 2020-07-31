import { useHistory } from 'react-router-dom';
import { stringifyQuery } from '../../utils/queryParser/queryParser';
import { useContext } from 'react';
import Context from '../../context/context';

const useHistoryPush = (replace = false) => {
	const history = useHistory();
	const context = useContext(Context);

	const push = (path: string, values: {}) => {
		const action = replace ? history.replace : history.push;
		if (Object.keys(values).length === 0) {
			return action(path);
		}
		const query = stringifyQuery(values, context.options);
		return action(`${path}?${query}`);
	};

	return push;
};

export default useHistoryPush;
