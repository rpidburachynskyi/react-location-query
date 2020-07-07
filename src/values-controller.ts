import {
	InitialValues,
	InitialValuesWrapper,
	InitialObject,
	InitialField,
	InitialValue,
	InitialObjectArray
} from './types/Initial';
import { QueryValue, QueryValues } from './types/Query';

let initialValuesWrappers: InitialValuesWrapper[] = [];

export const addInitialValues = (
	initialValues: InitialValues,
	index: number
) => {
	const wrapper: InitialValuesWrapper = { initialValues, index };
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
	let initialValues: InitialValues = {};
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

const normalizeValue = (value: InitialObject | QueryValue) => {
	return !isInitialValueObject(value) ? value : value.initial;
};

export const normalizeValues = (values: InitialValues | QueryValues) => {
	const normalized: any = {};
	Object.keys(values).forEach((key) => {
		normalized[key] = normalizeValue(values[key]);
	});
	return normalized;
};

export const prepareValuesForLocation = (values: InitialValues) => {
	const initialValues = getInitialValues();

	const normalized: any = { ...values };
	Object.keys(normalized).forEach((key) => {
		const value = normalized[key];
		const initialValue = initialValues[key];
		if (isInitialValueObject(initialValue)) {
			if (initialValue.hideIfInitial) {
				if (compareValues(value, initialValue)) {
					delete normalized[key];
				}
			} else {
				normalized[key] = normalizeValue(value);
			}
		}
	});
	return normalized;
};

export const normalizeValuesForUser = (values: InitialValues | QueryValues) => {
	const initialValues = getInitialValues();

	const normalized = {};
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
					(initialValue as InitialObjectArray).arrayType,
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

export const compareValues = (value: string, initialValue: InitialField) => {
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
	value: InitialObject | InitialValue | QueryValue
): value is InitialObject => typeof value === 'object' && !Array.isArray(value);

const typeOfValue = (value: InitialField) => {
	return isInitialValueObject(value)
		? value.type
		: (typeof value as 'string' | 'number' | 'boolean');
};
