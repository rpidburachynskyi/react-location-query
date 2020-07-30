import { QueryValue } from '../../../types/Query';
import { ObjectCustom } from '../../../types/Initial/Custom';

const normalizeCustom = (
	value: QueryValue | ObjectCustom,
	initialValue: ObjectCustom
): any => {
	if (value !== null && typeof value === 'object' && 'type' in value) {
		return value.initial;
	}
	console.log(value);
	if (typeof value === 'string') return initialValue.fromString(value);

	throw new Error('Custom value is not a string');
};

export default normalizeCustom;
