import { InitialExtendObjectString } from '../../../types/Initial/String';

const checkInitialValueString = (initialValue: InitialExtendObjectString) => {
	if (typeof initialValue.initial !== 'string')
		throw new Error('Initial value must be a string');

	if (initialValue.enum !== undefined) {
		if (initialValue.enum.length === 0)
			throw new Error('Enum array cannot be empty');
		if (!initialValue.enum.includes(initialValue.initial))
			throw new Error(
				`Initial value is not exists in enum array, expected: ${initialValue.enum}, got: ${initialValue.initial}`
			);
	}
};

export default checkInitialValueString;
