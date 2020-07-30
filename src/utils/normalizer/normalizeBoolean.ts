import { ObjectBoolean } from '../../types/Initial/Boolean';
// import { defaultValueByInitialValue } from '../../../stores/options/defaultValues';

const normalizeBoolean = (
	value: boolean | string | string[] | ObjectBoolean,
	initialValue: ObjectBoolean
): boolean => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial as boolean;

	if (value === 'true') return true;
	if (value === 'false') return false;
	if (typeof value === 'boolean') return value;
	if (Array.isArray(value)) return normalizeBoolean(value[0], initialValue);

	let newValue: typeof initialValue.initial;

	if (initialValue.onParsedError) {
		newValue = initialValue.onParsedError(value as string);
	} else {
		newValue = false; // defaultValueByInitialValue(initialValue) as any;
	}

	return newValue;
};

export default normalizeBoolean;
