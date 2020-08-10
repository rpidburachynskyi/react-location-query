import { ObjectBoolean } from '../../../types/Initial/Boolean';
import validateBoolean from './validateBoolean';
import validateInitial from './validateInitial';
import validate from './validate';

const normalizeBoolean = (
	value: boolean | string | string[] | ObjectBoolean,
	initialValue: ObjectBoolean
): boolean => {
	if (Array.isArray(value)) return normalizeBoolean(value[0], initialValue);

	let newValue = validateInitial(value, initialValue);
	newValue = validateBoolean(newValue, initialValue);
	newValue = validate(newValue, initialValue);

	return newValue;
};

export default normalizeBoolean;
