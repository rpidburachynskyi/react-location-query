import { ObjectNumber } from '../../../types/Initial/Number';

const checkInitialValueNumber = (initialValue: ObjectNumber) => {
	if (typeof initialValue.initial !== 'number')
		throw new Error('Initial value must be a number');
};

export default checkInitialValueNumber;
