import {
	InitialExtendValues,
	InitialExtendObjectArray,
	InitialExtendObject
} from '../../types/initial';
import { QueryValues, QueryValue } from '../../types/Query';
import { UserValues } from '../../types/User';
import { getInitialValues } from '../../values-controller';

const normalizeForUser = (
	values: InitialExtendValues | QueryValues,
	initialValues: InitialExtendValues = getInitialValues()
): UserValues => {
	const normalized: UserValues = {};
	Object.keys(values).forEach((key) => {
		const value = values[key];
		const initialValue = initialValues[key];
		switch (initialValue.type) {
			case 'boolean':
				normalized[key] = normalizeBoolean(value as string);
				break;
			case 'number':
				normalized[key] = normalizeNumber(value as string);
				break;
			case 'array':
				normalized[key] = normalizeArray(value, initialValue);
				break;
			case 'json':
				normalized[key] = normalizeJson(value as string);
				break;
			case 'string':
				normalized[key] = normalizeString(value as string);
				break;
			default:
				normalized[key] = value as any;
				break;
		}
	});
	return normalized;
};

const normalizeBoolean = (value: QueryValue | InitialExtendObject): boolean => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial as boolean;
	return value === 'true';
};

const normalizeNumber = (value: QueryValue | InitialExtendObject): number => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial as number;
	return parseInt(value.toString());
};

const normalizeArray = (
	value: QueryValue | InitialExtendObject,
	initialValue: InitialExtendObjectArray
) => {
	const normalizeArray = (
		type: 'string' | 'boolean' | 'number',
		array: Array<string | boolean | number>
	) => {
		if (typeof value === 'object' && 'type' in value)
			return (value as InitialExtendObjectArray).initial;
		let func: any;
		switch (type) {
			case 'boolean':
				func = (a: string | boolean) => a === true || a === 'true';
				break;
			case 'number':
				func = (a: string | number) => parseInt(a.toString());
				break;
		}

		if (func) return array.map(func);
		return array;
	};
	const array = (Array.isArray(value) ? value : [value]) as any;
	return normalizeArray(initialValue.arrayType, array);
};

const normalizeJson = (
	value: QueryValue | InitialExtendObject
): object | string | number | boolean => {
	try {
		return JSON.parse(value as string);
	} catch (e) {
		return {};
	}
};

const normalizeString = (value: QueryValue | InitialExtendObject) => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial as string;
	return value;
};

export default normalizeForUser;
