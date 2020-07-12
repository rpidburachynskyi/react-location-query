import {
	InitialExtendValues,
	InitialExtendValuesWrapper
} from './types/initial';
import { getDefaultOptions } from './options/options';

let initialValuesWrappers: InitialExtendValuesWrapper[] = [];

export const addInitialValues = (
	initialValues: InitialExtendValues,
	index: number
) => {
	const wrapper: InitialExtendValuesWrapper = {
		initialValues: mutateValuesToObjectValues(initialValues),
		index
	};
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

export const getInitialValueByFieldName = (fieldName: string) =>
	getInitialValues()[fieldName];

const mutateValuesToObjectValues = (values: InitialExtendValues) => {
	const result: InitialExtendValues = {};
	Object.keys(values).forEach((key) => {
		const value = values[key];

		if (typeof value === 'object') {
			result[key] = value;
		} else {
			switch (typeof value) {
				case 'string':
					result[key] = {
						type: 'string',
						initial: value,
						hideIfInitial: getDefaultOptions().hideIfDefault,
						replaceValueWhenParsedError: false
					};
					break;
				case 'number':
					result[key] = {
						type: 'number',
						initial: value,
						hideIfInitial: getDefaultOptions().hideIfDefault,
						replaceValueWhenParsedError: false
					};
					break;
				case 'boolean':
					result[key] = {
						type: 'boolean',
						initial: value,
						hideIfInitial: getDefaultOptions().hideIfDefault,
						replaceValueWhenParsedError: false
					};
					break;
			}
		}
	});
	return result;
};
