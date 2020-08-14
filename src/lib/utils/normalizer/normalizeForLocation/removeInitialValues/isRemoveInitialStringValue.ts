import ObjectString from '../../../../types/Initial/String/String';

const isRemoveInitialStringValue = (
	value: string,
	initialValue: ObjectString
): boolean => {
	return value === initialValue.initial;
};

export default isRemoveInitialStringValue;
