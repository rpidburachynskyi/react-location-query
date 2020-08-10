import ObjectString from '../../../types/Initial/String/String';

const validate = (value: string, initialValue: ObjectString) => {
	if (initialValue.validate) {
		return initialValue.validate(value);
	}
	return value;
};

export default validate;
