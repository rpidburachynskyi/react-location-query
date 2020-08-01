import { ObjectNumber } from '../../../../types/Initial/Number';

const isRemoveInitialNumberValue = (
	value: string,
	initialValue: ObjectNumber
): boolean => {
	return +value === initialValue.initial;
};

export default isRemoveInitialNumberValue;
