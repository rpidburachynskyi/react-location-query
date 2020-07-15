import { InitialExtendValue } from '../../types/Initial/Initial';
import { QueryValue } from '../../types/Query';
import useLocationQueryExtend from '../useLocationQueryExtend';

const useLocationField = <T = QueryValue>(
	name: string,
	value?: InitialExtendValue
): [T, (value: any) => void] => {
	const { fullQuery, setQueryField } = useLocationQueryExtend(
		value ? { [name]: value } : {}
	);
	return [
		(fullQuery[name] as any) as T,
		(value: any) => setQueryField(name, value)
	];
};

export default useLocationField;
