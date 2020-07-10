import {
	InitialExtendValues,
	InitialExtendObjectArray,
	InitialExtendObject,
	InitialExtendObjectNumber,
	InitialExtendObjectJson,
	InitialExtendObjectBoolean
} from '../../types/initial';
import { QueryValues, QueryValue } from '../../types/Query';
import { UserValues } from '../../types/User';
import { getInitialValues } from '../../values-controller';
import { setQueryFieldImmidiatly } from '../../location-controller';

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
				normalized[key] = normalizeBoolean(
					value as string,
					initialValue,
					key
				);
				break;
			case 'number':
				normalized[key] = normalizeNumber(
					value as string,
					initialValue
				);
				break;
			case 'array':
				normalized[key] = normalizeArray(value, initialValue);
				break;
			case 'json':
				normalized[key] = normalizeJson(
					value as string,
					initialValue,
					key
				);
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

const normalizeBoolean = (
	value: QueryValue | InitialExtendObject,
	initialValue: InitialExtendObjectBoolean,
	name: string
): boolean => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial as boolean;
	if (value === 'true') return true;
	if (value === 'false') return false;
	if (initialValue.onParsedError) {
		const newValue = initialValue.onParsedError(value as string);
		setQueryFieldImmidiatly(name, newValue ? 'true' : 'false');
		return newValue;
	}

	return false;
};

const normalizeNumber = (
	value: QueryValue | InitialExtendObjectNumber,
	initialValue: InitialExtendObjectNumber
): number => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial as number;
	try {
		if (isNaN(+value)) throw new Error('');
		return +value;
	} catch (e) {
		return initialValue.onParsedError
			? initialValue.onParsedError(value as string)
			: 1;
	}
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
				func = (a: string | number) => +a.toString();
				break;
		}

		if (func) return array.map(func);
		return array;
	};
	const array = (Array.isArray(value) ? value : [value]) as any;
	return normalizeArray(initialValue.arrayType, array);
};

const normalizeJson = (
	value: QueryValue | InitialExtendObject,
	initialValue: InitialExtendObjectJson,
	name: string
): object | string | number | boolean => {
	try {
		return JSON.parse(value as string);
	} catch (e) {
		if (initialValue.onParsedError) {
			const newValue = initialValue.onParsedError(value as string);
			setQueryFieldImmidiatly(name, newValue);
			return newValue;
		}
		return {};
	}
};

const normalizeString = (value: QueryValue | InitialExtendObject) => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial as string;
	return value;
};

export default normalizeForUser;
