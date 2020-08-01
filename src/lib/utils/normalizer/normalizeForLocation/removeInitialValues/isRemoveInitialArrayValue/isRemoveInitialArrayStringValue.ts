import { ObjectArrayString } from '../../../../../types/Initial/Array';

const isRemoveInitialArrayStringValue = (
	value: string[],
	initialValue: ObjectArrayString
): boolean => {
	for (let i = 0; i < initialValue.initial.length; i++) {
		if (initialValue.initial[i] !== value[i]) return false;
	}

	return true;
};

export default isRemoveInitialArrayStringValue;
