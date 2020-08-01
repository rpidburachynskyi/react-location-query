import { ObjectArrayBoolean } from '../../../../../types/Initial/Array';

const isRemoveInitialArrayBooleanValue = (
	value: string[],
	initialValue: ObjectArrayBoolean
): boolean => {
	for (let i = 0; i < initialValue.initial.length; i++) {
		if (initialValue.initial[i]) {
			if (value[i] !== 'true') return false;
		} else {
			if (value[i] !== 'false') return false;
		}
	}

	return true;
};

export default isRemoveInitialArrayBooleanValue;
