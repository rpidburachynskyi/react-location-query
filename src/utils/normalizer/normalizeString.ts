import { ObjectString } from '../../types/Initial/String';

const normalizeString = (
	value: string | string[] | ObjectString,
	initialValue: ObjectString
): string => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial as string;

	if (Array.isArray(value)) return normalizeString(value[0], initialValue);

	if (initialValue.enum) {
		if (!initialValue.enum.includes(value)) {
			if (initialValue.onParsedEnumError) {
				const newValue = initialValue.onParsedEnumError(value);

				if (!initialValue.enum.includes(newValue))
					throw new Error(
						`'${newValue}' not contains in enum array ${initialValue.enum}, but you passed it`
					);
				return newValue;
			} else {
				return initialValue.initial;
			}
		}
	}

	return value;
};

export default normalizeString;
