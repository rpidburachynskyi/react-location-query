import { ObjectNumber } from '../../../types/Initial/Number';

const validateMinMax = (value: number, initialValue: ObjectNumber): number => {
	if (initialValue.min !== undefined) {
		if (value < initialValue.min) {
			return initialValue.min;
		}
	}

	if (initialValue.max !== undefined) {
		if (value > initialValue.max) {
			return initialValue.max;
		}
	}

	return value;
};

export default validateMinMax;
