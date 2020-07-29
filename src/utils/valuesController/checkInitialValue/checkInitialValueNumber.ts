import { InitialExtendObjectNumber } from '../../../types/Initial/Number';

const checkInitialValueNumber = (initialValue: InitialExtendObjectNumber) => {
	if (typeof initialValue.initial !== 'number')
		throw new Error('Initial value must be a number');
};

export default checkInitialValueNumber;
