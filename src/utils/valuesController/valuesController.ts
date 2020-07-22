import {
	InitialExtendObject,
	InitialExtendValue,
	InitialExtendValues,
	InitialExtendValuesWrappers
} from '../../types/Initial/Initial';
import { getDefaultOptions } from '../../stores/options/options';

let initialValuesWrappers: InitialExtendValuesWrappers[] = [];

export const addInitialValues = (
	initialValues: InitialExtendValues,
	index: number
) => {
	if (Object.keys(initialValues).length === 0) return;
	removeInitialValues(initialValues);

	const wrapper: InitialExtendValuesWrappers = {};
	Object.keys(initialValues).forEach((key) => {
		wrapper[key] = {
			index,
			initialValue: mutateValueToObjectValues(initialValues[key]),
			name: key
		};
	});

	initialValuesWrappers = [...initialValuesWrappers, wrapper];
};

export const removeInitialValues = (initialValues: InitialExtendValues) => {
	initialValuesWrappers = initialValuesWrappers.filter(
		(v) => !Object.keys(v).find((k) => initialValues[k] !== undefined)
	);
};

export const getInitialValuesWrappers = () => {
	let initialValuesWrappersArray: InitialExtendValuesWrappers = {};
	initialValuesWrappers.forEach((initialValuesWrappersItem) => {
		initialValuesWrappersArray = {
			...initialValuesWrappersArray,
			...Object.keys(initialValuesWrappersItem)
				.map((key) => initialValuesWrappersItem[key])
				.reduce((p, c) => ({ ...p, [c.name]: c }), {})
		};
	});
	return initialValuesWrappersArray;
};

export const getInitialValues = () => {
	let initialValues: InitialExtendValues = {};
	initialValuesWrappers.forEach((initialValuesWrapper) => {
		initialValues = {
			...initialValues,
			...Object.keys(initialValuesWrapper)
				.map((key) => initialValuesWrapper[key])
				.reduce((p, c) => ({ ...p, [c.name]: c.initialValue }), {})
		};
	});
	return initialValues;
};

export const getInitialValueByFieldName = (fieldName: string) =>
	getInitialValues()[fieldName];

const mutateValueToObjectValues = (
	value: InitialExtendValue
): InitialExtendObject => {
	if (typeof value === 'object') {
		return value;
	} else {
		switch (typeof value) {
			case 'string':
				return {
					type: 'string',
					initial: value,
					hideIfInitial: getDefaultOptions().hideIfDefault,
					replaceValueWhenParsedError: false
				};
			case 'number':
				return {
					type: 'number',
					initial: value,
					hideIfInitial: getDefaultOptions().hideIfDefault,
					replaceValueWhenParsedError: false
				};
			case 'boolean':
				return {
					type: 'boolean',
					initial: value,
					hideIfInitial: getDefaultOptions().hideIfDefault,
					replaceValueWhenParsedError: false
				};
		}
	}
};
