import { useHistory } from 'react-router-dom';
import { stringifyQuery } from '../../lib/utils/queryParser/queryParser';
import { useContext } from 'react';
import Context from '../../lib/context/context';

const useQueryPush = (replace = false) => {
	const history = useHistory();
	const context = useContext(Context);

	const push = (path: string, values: {}, innerReplace = false) => {
		const action = replace || innerReplace ? history.replace : history.push;
		if (Object.keys(values).length === 0) {
			return action(path);
		}
		const query = stringifyQuery(values, context.options);
		return action(`${path}?${query}`);
	};

	return push;
};

export default useQueryPush;
