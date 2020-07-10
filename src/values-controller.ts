import {
	InitialExtendValues,
	InitialExtendValuesWrapper
} from './types/initial';

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

export const getInitialValueByFieldName = (fieldName: string) =>
	getInitialValues()[fieldName];
