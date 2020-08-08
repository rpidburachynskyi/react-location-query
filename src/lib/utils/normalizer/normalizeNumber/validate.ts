import { ObjectNumber } from '../../../types/Initial/Number/Number';

const validate = (value: number, initialValue: ObjectNumber): number => {
	if (initialValue.validate) {
		return initialValue.validate(value);
	}
	return value;
};

export default validate;
