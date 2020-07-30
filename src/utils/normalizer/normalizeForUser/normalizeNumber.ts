import { ObjectNumber } from '../../../types/Initial/Number';

const normalizeNumber = (
	value: number | string | string[] | ObjectNumber,
	initialValue: ObjectNumber
): number => {
	if (value !== null && typeof value === 'object' && 'type' in value) {
		return value.initial as number;
	}

	if (Array.isArray(value)) return normalizeNumber(value[0], initialValue);

	if (isNaN(+value)) {
		if (initialValue.onParsedError) {
			const newValue = initialValue.onParsedError(value as string);
			if (isNaN(newValue) || typeof newValue !== 'number')
				throw new Error(
					`onParsedError for type 'number' must returns number, but return '${newValue}'`
				);
			return newValue;
		} else {
			return initialValue.initial;
		}
	}

	return +value;
};

export default normalizeNumber;
