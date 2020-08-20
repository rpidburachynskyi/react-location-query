import { ObjectBoolean } from "../../../types/Initial/Boolean";

const validateInitial = (
	value: string | boolean | ObjectBoolean,
	initialValue: ObjectBoolean
): string | boolean => {
	if (typeof value === 'object' && 'type' in value)
		return initialValue.initial as boolean;
	return value;
};

export default validateInitial;
