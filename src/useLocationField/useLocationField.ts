import useLocationQuery from '../useLocationQuery';
import { InitialField } from '../types/Initial';

const useLocationField = (name: string, value?: InitialField) => {
	const { fullQuery, setQueryField } = useLocationQuery(
		value ? { [name]: value } : {}
	);
	return [fullQuery[name], (value: any) => setQueryField(name, value)];
};

export default useLocationField;
