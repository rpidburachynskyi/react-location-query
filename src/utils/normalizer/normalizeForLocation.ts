import { getInitialValues } from '../../values-controller';
import { QueryValue, QueryValues } from '../../types/Query';
import {
	InitialExtendField,
	InitialExtendValues,
	InitialExtendObjectString,
	InitialExtendObjectJson,
	InitialExtendObjectNumber
} from '../../types/initial';

const normalizeForLocation = (
	queryValues: QueryValues | InitialExtendValues
) => {
	const initialValues = getInitialValues();
	const locationValues: QueryValues = {};
	Object.keys(initialValues).forEach((key) => {
		const value = queryValues[key];
		const initialValue = initialValues[key];

		switch (initialValue.type) {
			case 'json':
				locationValues[key] = normalizeJson(value as any);
				break;
			case 'number':
				locationValues[key] = normalizeNumber(
					value as any,
					initialValue
				);
				break;
			case 'string':
			default:
				locationValues[key] = normalizeString(value as any);
				break;
		}

		if (initialValue.hideIfInitial) {
			if (
				(typeof value === 'object' && !Array.isArray(value)) ||
				compareValues(value, initialValue)
			) {
				delete locationValues[key];
			}
		}
	});
	return locationValues;
};

export const compareValues = (
	value: QueryValue,
	initialValue: InitialExtendField
) => {
	switch (initialValue.type) {
		case 'boolean':
			return initialValue.initial === (value === 'true');
		case 'number':
			return initialValue.initial === parseInt(value as any);
		case 'json':
			return JSON.stringify(initialValue.initial) === value;
		case 'string':
		default:
			return initialValue.initial === value;
	}
};

const normalizeString = (
	value: QueryValue | InitialExtendObjectString
): string => {
	if (typeof value === 'object' && 'type' in value) return value.initial;
	return value as string;
};

const normalizeNumber = (
	value: QueryValue | InitialExtendObjectNumber,
	initialValue: InitialExtendObjectNumber
): string => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial.toString();
	if (isNaN(+value)) {
		return (initialValue.onParsedError
			? initialValue.onParsedError(value as string)
			: initialValue.initial
		).toString();
	}
	return value as string;
};

const normalizeJson = (value: QueryValue | InitialExtendObjectJson): string => {
	if (typeof value === 'object' && 'type' in value)
		return JSON.stringify(value.initial);
	if (typeof value === 'object') return JSON.stringify(value);
	return value as string;
};

export default normalizeForLocation;
