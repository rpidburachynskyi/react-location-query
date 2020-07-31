import { ObjectNumber } from '../../types/Initial/Number';

const normalizeNumber = (
	value: number | string | string[] | ObjectNumber,
	initialValue: ObjectNumber
): number => {
	if (Array.isArray(value)) return normalizeNumber(value[0], initialValue);

	let newValue = validateInitial(value, initialValue);
	newValue = validateNumber(newValue, initialValue);
	newValue = validateEnum(newValue, initialValue);
	newValue = validate(newValue, initialValue);

	return newValue;
};

export default normalizeNumber;

const validateInitial = (
	value: string | number | ObjectNumber,
	initialValue: ObjectNumber
): string | number => {
	if (typeof value === 'object' && 'type' in value)
		return initialValue.initial;
	return value;
};

const validateNumber = (
	value: number | string,
	initialValue: ObjectNumber
): number => {
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

const validateEnum = (value: number, initialValue: ObjectNumber) => {
	if ('enum' in initialValue) {
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

const validate = (value: number, initialValue: ObjectNumber): number => {
	if (initialValue.validate) {
		return initialValue.validate(value);
	}
	return value;
};
