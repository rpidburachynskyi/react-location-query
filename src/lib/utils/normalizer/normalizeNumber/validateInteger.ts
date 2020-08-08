import { ObjectNumber } from '../../../types/Initial/Number';

const validateInteger = (value: number, initialValue: ObjectNumber) => {
	if ('integer' in initialValue) {
		if (!Number.isInteger(value)) {
			if (initialValue.onParsedIntegerError) {
				const newValue = initialValue.onParsedIntegerError(value);
				if (!Number.isInteger(newValue)) {
					throw new Error(
						`onParsedIntegerError returned non-integer value, received ${newValue}`
					);
				}
				return newValue;
			} else {
				return Math.floor(value);
			}
		}
	}

	return value;
};

export default validateInteger;
