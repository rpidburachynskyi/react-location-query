import { ObjectArray } from '../../../../types/Initial/Array';
import normalizeNumberArray from './normalizeNumberArray';
import normalizeBooleanArray from './normalizeBooleanArray';

const normalizeArray = (
	value: string | string[] | ObjectArray,
	initialValue: ObjectArray
) => {
	if (typeof value === 'object' && 'type' in value)
		return (value as ObjectArray).initial;
	const arrayValue = Array.isArray(value) ? value : [value];
	switch (initialValue.arrayType) {
		case 'number':
			return normalizeNumberArray(arrayValue, initialValue);
		case 'boolean':
			return normalizeBooleanArray(arrayValue, initialValue);
		case 'string':
			return arrayValue;
		default:
			throw new Error(
				// @ts-ignore
				`We cannot support ${initialValue.arrayType} type yet`
			);
	}
};

export default normalizeArray;
