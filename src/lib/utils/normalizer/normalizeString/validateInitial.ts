import ObjectString from '../../../types/Initial/String/String';

const validateInitial = (
	value: string | ObjectString,
	initialValue: ObjectString
): string => {
	if (typeof value === 'object' && 'type' in value)
		return initialValue.initial;
	return value;
};

export default validateInitial;
