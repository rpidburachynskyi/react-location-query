import { InitialExtendValue } from '../../types/Initial/Initial';
import { QueryValue } from '../../types/Query';
import useLocationQueryExtend from '../useLocationQueryExtend';

const useLocationField = <T extends QueryValue>(
	name: string,
	value?: InitialExtendValue
): [T, (value: T) => void] => {
	const { fullQuery, setQueryField } = useLocationQueryExtend(
		value ? { [name]: value } : {}
	);

	return [
		(fullQuery[name] as any) as T,
		(value: T) => setQueryField(name, value)
	];
};

export default useLocationField;
