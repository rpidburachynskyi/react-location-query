import { ObjectArray } from '../../../../../types/Initial/Array';
import isRemoveInitialArrayStringValue from './isRemoveInitialArrayStringValue';
import isRemoveInitialArrayBooleanValue from './isRemoveInitialArrayBooleanValue';
import isRemoveInitialArrayNumberValue from './isRemoveInitialArrayNumberValue';

const isRemoveInitialArrayValue = (
	value: string[],
	initialValue: ObjectArray
): boolean => {
	if (value.length !== initialValue.initial.length) return false;

	switch (initialValue.arrayType) {
		case 'string':
			return isRemoveInitialArrayStringValue(value, initialValue);
		case 'number':
			return isRemoveInitialArrayNumberValue(value, initialValue);
		case 'boolean':
			return isRemoveInitialArrayBooleanValue(value, initialValue);
	}

	throw new Error('Unknown array type');
};

export default isRemoveInitialArrayValue;
