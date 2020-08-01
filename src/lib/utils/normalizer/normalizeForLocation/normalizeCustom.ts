import { ObjectCustom } from '../../../types/Initial/Custom';

const normalizeCustom = (
	value: any | ObjectCustom,
	initialValue: ObjectCustom
): any => {
	if (value !== null && typeof value === 'object' && 'type' in value) {
		return value.initial;
	}
	return initialValue.toString(value);
};

export default normalizeCustom;
