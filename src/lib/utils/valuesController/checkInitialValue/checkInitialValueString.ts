import ObjectString from '../../../types/Initial/String/String';

const checkInitialValueString = (initialValue: ObjectString) => {
	if (typeof initialValue.initial !== 'string')
		throw new Error('Initial value must be a string');

	if (initialValue.enum !== undefined) {
		if (Array.isArray(initialValue.enum)) {
			if (initialValue.enum.length === 0)
				throw new Error('Enum array cannot be empty');
			if (!initialValue.enum.includes(initialValue.initial))
				throw new Error(
					`Initial value is not exists in enum array, expected: ${initialValue.enum}, got: ${initialValue.initial}`
				);
		} else {
			if (initialValue.enum.array.length === 0)
				throw new Error('Enum array cannot be empty');
			if (!initialValue.enum.array.includes(initialValue.initial))
				throw new Error(
					`Initial value is not exists in enum.array, expected: ${initialValue.enum.array}, got: ${initialValue.initial}`
				);
		}
	}
};

export default checkInitialValueString;
