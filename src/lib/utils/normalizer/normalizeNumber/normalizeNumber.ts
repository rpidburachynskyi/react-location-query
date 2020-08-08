import { ObjectNumber } from '../../../types/Initial/Number/Number';
import validateInitial from './validateInitial';
import validateNumber from './validateNumber';
import validateEnum from './validateEnum';
import validateInteger from './validateInteger';
import validateMinMax from './validateMinMax';
import validate from './validate';

const normalizeNumber = (
	value: number | string | string[] | ObjectNumber,
	initialValue: ObjectNumber
): number => {
	if (Array.isArray(value)) return normalizeNumber(value[0], initialValue);

	let newValue = validateInitial(value, initialValue);
	newValue = validateNumber(newValue, initialValue);
	newValue = validateEnum(newValue, initialValue);
	newValue = validateInteger(newValue, initialValue);
	newValue = validateMinMax(newValue, initialValue);
	newValue = validate(newValue, initialValue);

	return newValue;
};

export default normalizeNumber;
