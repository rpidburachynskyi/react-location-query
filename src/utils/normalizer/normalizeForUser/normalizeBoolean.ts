import { QueryValue } from '../../../types/Query';
import {
	InitialExtendObject,
	InitialExtendValueWrapper
} from '../../../types/Initial/Initial';
import { InitialExtendObjectBoolean } from '../../../types/Initial/Boolean';
// import { defaultValueByInitialValue } from '../../../stores/options/defaultValues';

const normalizeBoolean = (
	value: QueryValue | InitialExtendObject,
	wrapper: InitialExtendValueWrapper<InitialExtendObjectBoolean>
): boolean => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial as boolean;

	if (value === 'true') return true;
	if (value === 'false') return false;
	if (typeof value === 'boolean') return value;

	let newValue: typeof wrapper.initialValue.initial;
	const initialValue = wrapper.initialValue;

	if (initialValue.onParsedError) {
		newValue = initialValue.onParsedError(value as string);
	} else {
		newValue = false; // defaultValueByInitialValue(initialValue) as any;
	}

	return newValue;
};

export default normalizeBoolean;
