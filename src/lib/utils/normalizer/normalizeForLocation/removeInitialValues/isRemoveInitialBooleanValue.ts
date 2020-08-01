import { ObjectBoolean } from '../../../../types/Initial/Boolean';

const isRemoveInitialBooleanValue = (
	value: string,
	initialValue: ObjectBoolean
): boolean => {
	return value === `${initialValue.initial}`;
};

export default isRemoveInitialBooleanValue;
