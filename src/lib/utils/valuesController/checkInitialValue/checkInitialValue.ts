import checkInitialValueString from './checkInitialValueString';
import checkInitialValueBoolean from './checkInitialValueBoolean';
import checkInitialValueNumber from './checkInitialValueNumber';
import { InitialObjectType } from '../../../types/Initial/Initial';

const checkInitialValue = (initialValue: InitialObjectType) => {
	switch (initialValue.type) {
		case 'string':
			return checkInitialValueString(initialValue);
		case 'number':
			return checkInitialValueNumber(initialValue);
		case 'boolean':
			return checkInitialValueBoolean(initialValue);
	}
};

export default checkInitialValue;
