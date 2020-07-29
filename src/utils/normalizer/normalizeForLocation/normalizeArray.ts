import { InitialExtendObjectArray } from '../../../types/Initial/Array';
import { QueryValue } from '../../../types/Query';
import normalizeBooleanArray from '../normalizeForUser/normalizeArray/normalizeBooleanArray';
import normalizeNumberArray from '../normalizeForUser/normalizeArray/normalizeNumberArray';

const normalizeArray1 = (
	value: QueryValue | InitialExtendObjectArray,
	initialValue: InitialExtendObjectArray
) => {
	if (typeof value === 'object' && 'type' in value) return value.initial;
	switch (initialValue.arrayType) {
		case 'boolean':
			return normalizeBooleanArray(
				value as any,
				initialValue as any
			).map((v) => (v ? 'true' : 'false'));
		case 'number':
			return normalizeNumberArray(
				value as any,
				initialValue as any
			).map((v) => v?.toString());
		case 'string':
			return value;
		default:
			throw new Error(
				// @ts-ignore
				`We cannot support ${initialValue.arrayType} type yet`
			);
	}
	return value;
};

export default normalizeArray1;
