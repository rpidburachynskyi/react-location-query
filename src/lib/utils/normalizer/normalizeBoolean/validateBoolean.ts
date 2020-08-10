import { ObjectBoolean } from "../../../types/Initial/Boolean";

const validateBoolean = (
	value: string | boolean,
	initialValue: ObjectBoolean
): boolean => {
	if (value === 'true') return true;
	if (value === 'false') return false;
	if (typeof value === 'boolean') return value;

	if (initialValue.onParsedError)
		return initialValue.onParsedError(value as string);

	return initialValue.initial;
};

export default validateBoolean;
