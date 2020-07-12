import {
	InitialExtendValues,
	InitialExtendObjectArray,
	InitialExtendObject,
	InitialExtendObjectNumber,
	InitialExtendObjectJson,
	InitialExtendObjectBoolean,
	InitialExtendObjectString
} from '../../types/initial';
import { QueryValues, QueryValue } from '../../types/Query';
import { UserValues } from '../../types/User';
import { getInitialValues } from '../../values-controller';
import { setQueryFieldImmidiatly } from '../../location-controller';
import { defaultValueByInitialValue } from '../../options/defaultValues';
import { getDefaultOptions } from '../../options/options';

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
				normalized[key] = normalizeArray(value, initialValue, key);
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

	return normalizeAny(value, initialValue, name) as boolean;
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
	initialValue: InitialExtendObjectArray,
	name: string
) => {
	if (typeof value === 'object' && 'type' in value)
		return (value as InitialExtendObjectArray).initial;
	const normalizeArray = (
		type: 'string' | 'boolean' | 'number',
		array: Array<string | boolean | number>
	) => {
		let func: any;
		switch (type) {
			case 'boolean':
				func = (a: string | boolean) => {
					if (a === 'true') return true;
					if (a === 'false') return false;
					throw new Error('');
				};
				break;
			case 'number':
				func = (a: string | number) => {
					const _a = +a.toString();
					if (isNaN(_a)) throw new Error('');
					return _a;
				};
				break;
		}

		try {
			if (func) return array.map(func);
			return array;
		} catch (e) {
			return normalizeAny(array, initialValue, name);
		}
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

const normalizeAny = (
	value: any,
	initialValue: Exclude<InitialExtendObject, InitialExtendObjectString>,
	name: string
) => {
	let newValue: typeof initialValue.initial;

	if (initialValue.onParsedError) {
		if (initialValue.type === 'array')
			newValue = initialValue.onParsedError(value as string[]);
		else newValue = initialValue.onParsedError(value as string);
	} else {
		newValue = defaultValueByInitialValue(initialValue);
	}

	if (
		initialValue.replaceValueWhenParsedError === undefined
			? getDefaultOptions().replaceValueWhenParsedError
			: initialValue.replaceValueWhenParsedError
	) {
		setQueryFieldImmidiatly(name, newValue as any);
	}
	return newValue;
};

export default normalizeForUser;
