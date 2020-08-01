import { ObjectArray } from '../../../types/Initial/Array';
import normalizeBooleanArray from '../normalizeForUser/normalizeArray/normalizeBooleanArray';
import normalizeNumberArray from '../normalizeForUser/normalizeArray/normalizeNumberArray';

const normalizeArray1 = (
	value: string[] | number[] | boolean[],
	initialValue: ObjectArray
): string[] => {
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
			).map((v) => v!.toString());
		case 'string':
			return value as any;
		default:
			throw new Error(
				// @ts-ignore
				`We cannot support ${initialValue.arrayType} type yet`
			);
	}
};

export default normalizeArray1;
