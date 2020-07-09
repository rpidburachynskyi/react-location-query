import {
	InitialExtendValues,
	InitialExtendValuesWrapper,
	InitialExtendObject,
	InitialExtendField,
	InitialExtendValue,
	InitialExtendObjectArray
} from './types/initial';
import { QueryValue, QueryValues } from './types/Query';
import { UserValues } from './types/User';

let initialValuesWrappers: InitialExtendValuesWrapper[] = [];

export const addInitialValues = (
	initialValues: InitialExtendValues,
	index: number
) => {
	const wrapper: InitialExtendValuesWrapper = { initialValues, index };
	initialValuesWrappers = [
		...initialValuesWrappers.filter((v) => v.index !== index),
		wrapper
	];
};

export const removeInitialValues = (index: number) => {
	initialValuesWrappers = initialValuesWrappers.filter(
		(v) => v.index !== index
	);
};

export const getInitialValuesWrappers = () => {
	return initialValuesWrappers;
};

export const getInitialValues = () => {
	let initialValues: InitialExtendValues = {};
	initialValuesWrappers
		.sort((a, b) => a.index - b.index)
		.forEach((initialValuesWrapper) => {
			initialValues = {
				...initialValues,
				...initialValuesWrapper.initialValues
			};
		});

	return initialValues;
};

const normalizeValue = (value: InitialExtendObject | QueryValue) => {
	return !isInitialValueObject(value) ? value : value.initial;
};

export const normalizeValues = (values: InitialExtendValues | QueryValues) => {
	const normalized: any = {};
	Object.keys(values).forEach((key) => {
		normalized[key] = normalizeValue(values[key]);
	});
	return normalized;
};

export const prepareValuesForLocation = (values: InitialExtendValues) => {
	const initialValues = getInitialValues();
	const normalized: any = { ...values };
	Object.keys(normalized).forEach((key) => {
		const value = normalized[key];
		const initialValue = initialValues[key];
		if (isInitialValueObject(initialValue)) {
			if (initialValue.hideIfInitial) {
				if (
					compareValues(value, initialValue) ||
					isInitialValueObject(value)
				) {
					delete normalized[key];
				}
			} else {
				normalized[key] = normalizeValue(value);
			}
		}
	});
	return normalized;
};

export const normalizeValuesForUser = (
	values: InitialExtendValues | QueryValues,
	initialValues: InitialExtendValues
): UserValues => {
	const normalized: UserValues = {};
	Object.keys(values).forEach((key) => {
		const value = normalizeValue(values[key]);
		const initialValue = initialValues[key];
		switch (typeOfValue(initialValue)) {
			case 'boolean':
				normalized[key] = value === 'true';
				break;
			case 'number':
				normalized[key] = parseInt(value.toString());
				break;
			case 'array':
				const normalizeArray = (
					type: 'string' | 'boolean' | 'number',
					array: Array<string | boolean | number>
				) => {
					let func: any;
					switch (type) {
						case 'boolean':
							func = (a: string | boolean) =>
								a === true || a === 'true';
							break;
						case 'number':
							func = (a: string | number) =>
								parseInt(a.toString());
							break;
					}

					if (func) return array.map(func);
					return array;
				};
				const array = Array.isArray(value) ? value : [value];
				normalized[key] = normalizeArray(
					(initialValue as InitialExtendObjectArray).arrayType,
					array
				);
				break;
			case 'string':
			default:
				normalized[key] = value;
		}
	});
	return normalized;
};

export const compareValues = (
	value: string,
	initialValue: InitialExtendField
) => {
	const compare = (type: string, initialValue: any, value: any) => {
		switch (type) {
			case 'boolean':
				return initialValue === (value === 'true');
			case 'number':
				return initialValue === parseInt(value);
			case 'string':
			default:
				return initialValue === value;
		}
	};

	if (typeof initialValue !== 'object' || Array.isArray(initialValue)) {
		return compare(typeof initialValue, initialValue, value);
	}
	return compare(initialValue.type, initialValue.initial, value);
};
const isInitialValueObject = (
	value: InitialExtendObject | InitialExtendValue | QueryValue
): value is InitialExtendObject =>
	typeof value === 'object' && !Array.isArray(value);

const typeOfValue = (value: InitialExtendField) => {
	return isInitialValueObject(value)
		? value.type
		: (typeof value as 'string' | 'number' | 'boolean');
};
