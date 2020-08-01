import { ObjectBoolean } from '../../types/Initial/Boolean';

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

const validateInitial = (
	value: string | boolean | ObjectBoolean,
	initialValue: ObjectBoolean
): string | boolean => {
	if (typeof value === 'object' && 'type' in value)
		return initialValue.initial as boolean;
	return value;
};

const validateBoolean = (
	value: string | boolean,
	initialValue: ObjectBoolean
): boolean => {
	if (value === 'true') return true;
	if (value === 'false') return false;
	if (typeof value === 'boolean') return value;

	if (initialValue.onParsedError)
		return initialValue.onParsedError(value as string);

	return initialValue.initial;
};

const validate = (value: boolean, initialValue: ObjectBoolean) => {
	if (initialValue.validate) {
		return initialValue.validate(value);
	}
	return value;
};

export default normalizeBoolean;
