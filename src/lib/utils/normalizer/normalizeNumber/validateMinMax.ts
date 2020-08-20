import ObjectNumber from '../../../types/Initial/Number/Number';

const validateMinMax = (value: number, initialValue: ObjectNumber): number => {
	let newValue = validateMin(value, initialValue);
	newValue = validateMax(newValue, initialValue);

	return newValue;
};

const validateMin = (value: number, initialValue: ObjectNumber): number => {
	if (initialValue.min !== undefined) {
		if (typeof initialValue.min === 'object') {
			if (value < initialValue.min.value) {
				if (initialValue.min.onLess) {
					return initialValue.min.onLess(value);
				} else {
					return initialValue.min.value;
				}
			}
		} else {
			if (value < initialValue.min) {
				return initialValue.min;
			}
		}
	}
	return value;
};

const validateMax = (value: number, initialValue: ObjectNumber): number => {
	if (initialValue.max !== undefined) {
		if (typeof initialValue.max === 'object') {
			if (value > initialValue.max.value) {
				if (initialValue.max.onOver) {
					return initialValue.max.onOver(value);
				} else {
					return initialValue.max.value;
				}
			}
		} else {
			if (value > initialValue.max) {
				return initialValue.max;
			}
		}
	}
	return value;
};

export default validateMinMax;
