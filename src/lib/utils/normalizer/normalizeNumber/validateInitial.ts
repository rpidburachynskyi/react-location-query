import { ObjectNumber } from '../../../types/Initial/Number';

const validateInitial = (
	value: string | number | ObjectNumber,
	initialValue: ObjectNumber
): string | number => {
	if (typeof value === 'object' && 'type' in value)
		return initialValue.initial;
	return value;
};

export default validateInitial;
