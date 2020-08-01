import { ObjectCustom } from '../../../types/Initial/Custom';

const normalizeCustom = (
	value: any | string | string[] | ObjectCustom,
	initialValue: ObjectCustom
): any => {
	if (value !== null && typeof value === 'object' && 'type' in value) {
		return value.initial;
	}

	if (Array.isArray(value)) return normalizeCustom(value[0], initialValue);
	if (typeof value === 'string') return initialValue.fromString(value);

	throw new Error('Custom value is not a string');
};

export default normalizeCustom;
