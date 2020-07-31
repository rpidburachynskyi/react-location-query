import { InitialObjectType } from '../../../../types/Initial/Initial';
import isRemoveInitialStringValue from './isRemoveInitialStringValue';
import isRemoveInitialNumberValue from './isRemoveInitialNumberValue';
import isRemoveInitialBooleanValue from './isRemoveInitialBooleanValue';
import isRemoveInitialArrayValue from './isRemoveInitialArrayValue/isRemoveInitialArrayValue';

const isRemoveInitialValue = (
	value: string | string[],
	initialValue: InitialObjectType
) => {
	if (Array.isArray(value)) {
		if (initialValue.type === 'array')
			return isRemoveInitialArrayValue(value, initialValue);
		throw new Error('Array with uncorrect behavior');
	}

	switch (initialValue.type) {
		case 'string':
			return isRemoveInitialStringValue(value, initialValue);
		case 'number':
			return isRemoveInitialNumberValue(value, initialValue);
		case 'boolean':
			return isRemoveInitialBooleanValue(value, initialValue);
	}

	throw new Error('Unknown initial value type');
};

export default isRemoveInitialValue;
