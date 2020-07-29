import { QueryValue } from '../../../types/Query';
import { InitialExtendObjectString } from '../../../types/Initial/String';

const normalizeString = (
	value: string | QueryValue | InitialExtendObjectString,
	initialValue: InitialExtendObjectString
): string => {
	if (typeof value === 'object' && 'type' in value) {
		return initialValue.initial;
	}

	if (typeof value !== 'string')
		throw new Error('Unknown behavior error: Value is not an string');
	if (initialValue.enum !== undefined) {
		if (!initialValue.enum.includes(value)) {
			console.log(initialValue.onParsedEnumError);
			if (initialValue.onParsedEnumError) {
				const newValue = initialValue.onParsedEnumError(value);
				console.log(newValue);
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
