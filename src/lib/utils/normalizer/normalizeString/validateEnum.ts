import ObjectString from '../../../types/Initial/String/String';

const validateEnum = (value: string, initialValue: ObjectString) => {
	if (initialValue.enum) {
		if (Array.isArray(initialValue.enum)) {
			if (!initialValue.enum.includes(value)) {
				return initialValue.initial;
			}
		} else {
			if (!initialValue.enum.array.includes(value)) {
				if (initialValue.enum.onNonEnum) {
					const newValue = initialValue.enum.onNonEnum(value);

					if (!initialValue.enum.array.includes(newValue)) {
						throw new Error(
							`'${newValue}' not contains in enum array ${initialValue.enum}, but you passed it from onNonEnum`
						);
					}

					return newValue;
				}
			}
		}
	}

	return value;
};

export default validateEnum;
