import ObjectNumber from '../../../types/Initial/Number/Number';

const validateInteger = (value: number, initialValue: ObjectNumber) => {
	if (initialValue.integer) {
		if (!Number.isInteger(value)) {
			if (typeof initialValue.integer === 'boolean') {
				return Math.floor(value);
			} else {
				if (initialValue.integer.onFloat) {
					const newValue = initialValue.integer.onFloat(value);
					if (!Number.isInteger(newValue)) {
						throw new Error(
							`onFloat returned non-integer value, received ${newValue}`
						);
					}
				}
			}
		}
	}

	return value;
};

export default validateInteger;
