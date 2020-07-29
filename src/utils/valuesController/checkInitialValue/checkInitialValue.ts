import { InitialExtendObject } from '../../../types/Initial/Initial';
import checkInitialValueString from './checkInitialValueString';
import checkInitialValueBoolean from './checkInitialValueBoolean';
import checkInitialValueNumber from './checkInitialValueNumber';

const checkInitialValue = (initialValue: InitialExtendObject) => {
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
