import { ObjectArrayNumber } from '../../../../../types/Initial/Array';

const isRemoveInitialArrayNumberValue = (
	value: string[],
	initialValue: ObjectArrayNumber
): boolean => {
	for (let i = 0; i < initialValue.initial.length; i++) {
		if (initialValue.initial[i] !== +value[i]) return false;
	}

	return true;
};

export default isRemoveInitialArrayNumberValue;
