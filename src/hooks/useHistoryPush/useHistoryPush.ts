import { useHistory } from 'react-router-dom';
import qs from 'querystring';

const useHistoryPush = () => {
	const history = useHistory();

	const push = (path: string, values: {}) => {
		if (Object.keys(values).length === 0) {
			return history.push(path);
		}
		const query = qs.stringify(values);
		return history.push(`${path}?${query}`);
	};

	return push;
};

export default useHistoryPush;
