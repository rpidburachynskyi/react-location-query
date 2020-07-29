import { InitialExtendObjectBoolean } from '../../../types/Initial/Boolean';

const checkInitialValueBoolean = (initialValue: InitialExtendObjectBoolean) => {
	if (typeof initialValue.initial !== 'boolean')
		throw new Error('Initial value must be a boolean');
};

export default checkInitialValueBoolean;
