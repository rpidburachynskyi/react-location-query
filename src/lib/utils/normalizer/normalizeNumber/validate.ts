import { ObjectNumber } from '../../../types/Initial/Number';

const validate = (value: number, initialValue: ObjectNumber): number => {
	if (initialValue.validate) {
		return initialValue.validate(value);
	}
	return value;
};

export default validate;
