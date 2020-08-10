import { ObjectBoolean } from '../../../types/Initial/Boolean';

const validate = (value: boolean, initialValue: ObjectBoolean) => {
	if (initialValue.validate) {
		return initialValue.validate(value);
	}
	return value;
};

export default validate;
