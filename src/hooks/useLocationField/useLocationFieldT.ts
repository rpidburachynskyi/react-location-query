import { ActionOnChange } from '../../lib/types/ActionOnChange';
import useLocationField from './useLocationField';

type ReturnedTypes = string | number | boolean | object;

function useLocationFieldT<T extends ReturnedTypes | Array<ReturnedTypes>>(
	name: string
): [T, (value: T, actionOnChange?: ActionOnChange) => void];

function useLocationFieldT<T>(name: string) {
	return useLocationField(name) as [
		T,
		(value: T, actionOnChange?: ActionOnChange) => void
	];
}

export default useLocationFieldT;
