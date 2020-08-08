import { ObjectNumber } from '../../../types/Initial/Number';

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

export default validateEnum;
