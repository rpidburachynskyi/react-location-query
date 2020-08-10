import ObjectString from '../../../types/Initial/String/String';
import validateInitial from './validateInitial';
import validateEnum from './validateEnum';
import validate from './validate';

const normalizeString = (
	value: string | string[] | ObjectString,
	initialValue: ObjectString
): string => {
	if (Array.isArray(value)) return normalizeString(value[0], initialValue);

	let newValue = validateInitial(value, initialValue);
	newValue = validateEnum(newValue, initialValue);
	newValue = validate(newValue, initialValue);

	return newValue;
};

export default normalizeString;
