import ObjectNumber from '../../../types/Initial/Number/Number';

const validateEnum = (value: number, initialValue: ObjectNumber) => {
	if (initialValue.enum !== undefined) {
		if (Array.isArray(initialValue.enum)) {
			if (!initialValue.enum.includes(value)) {
				return initialValue.initial;
			}
		} else {
			if (initialValue.enum.onNonEnum !== undefined) {
				const newValue = initialValue.enum.onNonEnum(value);

				if (!initialValue.enum.array.includes(newValue)) {
					throw new Error(
						`'${newValue}' not contains in enum array ${initialValue.enum}, but you passed it`
					);
				}

				return newValue;
			}
		}
	}

	return value;
};

export default validateEnum;
