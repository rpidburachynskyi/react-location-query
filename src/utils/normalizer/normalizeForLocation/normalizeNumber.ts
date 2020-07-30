import { ObjectNumber } from '../../../types/Initial/Number';
import normalizeNumber from '../normalizeForUser/normalizeNumber';

const normalizeNumber1 = (
	value: string | number | ObjectNumber,
	initialValue: ObjectNumber
): string => {
	return normalizeNumber(value, initialValue).toString();
};

export default normalizeNumber1;
