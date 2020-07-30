import { InitialExtendObjectNumber } from '../../../types/Initial/Number';
import normalizeNumber from '../normalizeForUser/normalizeNumber';

const normalizeNumber1 = (
	value: string | number | InitialExtendObjectNumber,
	initialValue: InitialExtendObjectNumber
): string => {
	return normalizeNumber(value, initialValue).toString();
};

export default normalizeNumber1;
