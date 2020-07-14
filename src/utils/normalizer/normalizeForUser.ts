import {
	InitialExtendValues,
	InitialExtendObject,
	InitialExtendValueWrapper,
	InitialExtendValuesWrappers
} from '../../types/Initial/Initial';
import { QueryValues, QueryValue } from '../../types/Query';
import { UserValues } from '../../types/User';
import { getInitialValuesWrappers } from '../valuesController/valuesController';
import { setQueryFieldImmidiatly } from '../locationController/locationController';
import { defaultValueByInitialValue } from '../../stores/options/defaultValues';
import { getDefaultOptions } from '../../stores/options/options';
import { InitialExtendObjectBoolean } from '../../types/Initial/Boolean';
import { InitialExtendObjectNumber } from '../../types/Initial/Number';
import { InitialExtendObjectArray } from '../../types/Initial/Array';
import { InitialExtendObjectJson } from '../../types/Initial/Json';
import { InitialExtendObjectString } from '../../types/Initial/String';

export const normalizeForUser = (
	values: InitialExtendValues | QueryValues,
	initialValuesWrappers: InitialExtendValuesWrappers = getInitialValuesWrappers()
): UserValues => {
	const normalized: UserValues = {};
	Object.keys(values).forEach((key) => {
		const value = values[key];
		const initialValueWrapper = initialValuesWrappers[key];
		const initialValue = initialValueWrapper.initialValue;
		switch (initialValue.type) {
			case 'boolean':
				normalized[key] = normalizeBoolean(
					value as string,
					initialValueWrapper as InitialExtendValueWrapper<
						InitialExtendObjectBoolean
					>
				);
				break;
			case 'number':
				normalized[key] = normalizeNumber(
					value as string,
					initialValueWrapper as InitialExtendValueWrapper<
						InitialExtendObjectNumber
					>
				);
				break;
			case 'array':
				normalized[key] = normalizeArray(
					value,
					initialValueWrapper as InitialExtendValueWrapper<
						InitialExtendObjectArray
					>
				);
				break;
			case 'json':
				normalized[key] = normalizeJson(
					value as string,
					initialValueWrapper as InitialExtendValueWrapper<
						InitialExtendObjectJson
					>
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
	wrapper: InitialExtendValueWrapper<InitialExtendObjectBoolean>
): boolean => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial as boolean;
	if (value === 'true') return true;
	if (value === 'false') return false;

	return normalizeAny(value, wrapper.initialValue, wrapper.name) as boolean;
};

const normalizeNumber = (
	value: QueryValue | InitialExtendObjectNumber,
	wrapper: InitialExtendValueWrapper<InitialExtendObjectNumber>
): number => {
	if (typeof value === 'object' && 'type' in value) {
		return value.initial as number;
	}
	try {
		if (isNaN(+value) || value === '') throw new Error('');
		return +value;
	} catch (e) {
		return normalizeAny(
			value,
			wrapper.initialValue,
			wrapper.name
		) as number;
	}
};

const normalizeArray = (
	value: QueryValue | InitialExtendObject,
	initialValueWrapper: InitialExtendValueWrapper<InitialExtendObjectArray>
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
			return normalizeAny(
				array,
				initialValueWrapper.initialValue,
				initialValueWrapper.name
			);
		}
	};
	const array = (Array.isArray(value) ? value : [value]) as any;
	return normalizeArray(initialValueWrapper.initialValue.arrayType, array);
};

const normalizeJson = (
	value: QueryValue | InitialExtendObject,
	wrapper: InitialExtendValueWrapper<InitialExtendObjectJson>
): object | string | number | boolean => {
	try {
		return JSON.parse(value as string);
	} catch (e) {
		if (wrapper.initialValue.onParsedError) {
			const newValue = wrapper.initialValue.onParsedError(
				value as string
			);
			setQueryFieldImmidiatly(wrapper.name, newValue);
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

export const normalizeForUserByInitialValues = (
	values: InitialExtendValues | QueryValues,
	initialValues: InitialExtendValues
) => {
	const initialValuesWrappers = getInitialValuesWrappers();
	const resultsWrappers: InitialExtendValuesWrappers = {};

	Object.keys(initialValuesWrappers).forEach((key) => {
		if (initialValues[key] !== undefined) {
			resultsWrappers[key] = initialValuesWrappers[key];
		}
	});
	return normalizeForUser(values, resultsWrappers);
};
