import { ObjectString } from '../../types/Initial/String';

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

const validateInitial = (
	value: string | ObjectString,
	initialValue: ObjectString
): string => {
	if (typeof value === 'object' && 'type' in value)
		return initialValue.initial;
	return value;
};

const validateEnum = (value: string, initialValue: ObjectString) => {
	if (initialValue.enum) {
		if (!initialValue.enum.includes(value)) {
			if (initialValue.onParsedEnumError) {
				const newValue = initialValue.onParsedEnumError(value);

				if (!initialValue.enum.includes(newValue)) {
					throw new Error(
						`'${newValue}' not contains in enum array ${initialValue.enum}, but you passed it`
					);
				}

				return newValue;
			} else {
				return initialValue.initial;
			}
		}
	}

	return value;
};

const validate = (value: string, initialValue: ObjectString) => {
	if (initialValue.validate) {
		return initialValue.validate(value);
	}
	return value;
};

export default normalizeString;
