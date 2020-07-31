import { ObjectJson } from '../../../../types/Initial/Json';

const isRemoveInitialJsonValue = (
	value: object | number | string | boolean,
	initialValue: ObjectJson
): boolean => {
	return value === JSON.stringify(initialValue.initial);
};

export default isRemoveInitialJsonValue;
