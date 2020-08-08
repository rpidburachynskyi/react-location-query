import { ObjectNumber } from '../../../types/Initial/Number/Number';

const checkInitialValueNumber = (initialValue: ObjectNumber) => {
	if (typeof initialValue.initial !== 'number')
		throw new Error('Initial value must be a number');
	if (initialValue.validate) {
		if (!initialValue.validate(initialValue.initial))
			throw new Error(
				'Initial value must be a validating by validate callback'
			);
	}

	if (initialValue.min !== undefined) {
		if (initialValue.max !== undefined) {
			if (initialValue.min > initialValue.max) {
				throw new Error(
					`'min' must be smaller then 'max'`
				);
			}
		}
	}
};

export default checkInitialValueNumber;
