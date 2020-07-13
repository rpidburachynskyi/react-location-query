import { InitialExtendValue } from '../types/Initial/Initial';
import useLocationQueryExtend from '../useLocationQueryExtend';

const useLocationField = (name: string, value?: InitialExtendValue) => {
	const { fullQuery, setQueryField } = useLocationQueryExtend(
		value ? { [name]: value } : {}
	);
	return [fullQuery[name], (value: any) => setQueryField(name, value)];
};

export default useLocationField;
