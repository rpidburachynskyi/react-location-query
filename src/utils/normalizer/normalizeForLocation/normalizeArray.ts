import { QueryValue } from '../../../types/Query';
import { InitialExtendObjectArray } from '../../../types/Initial/Array';

const normalizeArray = (
	value: QueryValue | InitialExtendObjectArray,
	initialValue: InitialExtendObjectArray
) => {
	if (typeof value === 'object' && 'type' in value) return value.initial;
	console.log(initialValue);
	return value;
};

export default normalizeArray;
