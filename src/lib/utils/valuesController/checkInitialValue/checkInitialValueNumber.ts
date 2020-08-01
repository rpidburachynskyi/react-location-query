import { ObjectNumber } from '../../../types/Initial/Number';

const checkInitialValueNumber = (initialValue: ObjectNumber) => {
	if (typeof initialValue.initial !== 'number')
		throw new Error('Initial value must be a number');
	if (initialValue.validate) {
		if (!initialValue.validate(initialValue.initial))
			throw new Error(
				'Initial value must be a validating by validate callback'
			);
	}
};

export default checkInitialValueNumber;
