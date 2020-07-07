import {
	InitialValuesField,
	InitialValues,
	InitialValuesWrapper
} from './types';

let initialValuesWrappers: InitialValuesWrapper[] = [];

export const addInitialValues = (
	initialValues: InitialValues,
	index: number
) => {
	const wrapper: InitialValuesWrapper = { initialValues, index };
	initialValuesWrappers = [...initialValuesWrappers, wrapper];
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
	let normalized = {};
	initialValuesWrappers
		.sort((a, b) => a.index - b.index)
		.forEach((initialValuesWrapper) => {
			normalized = {
				...normalized,
				...initialValuesWrapper.initialValues
			};
		});

	return normalized;
};

const normalizeValue = (value: InitialValuesField) => {
	return typeof value !== 'object' ? value : value.initial;
};

export const normalizeValues = (values: InitialValues) => {
	const normalized: any = {};
	Object.keys(values).forEach((key) => {
		normalized[key] = normalizeValue(values[key]);
	});
	return normalized;
};

export const prepareValuesForLocation = (
	values: InitialValues,
	initialValues: InitialValues
) => {
	const normalized: any = { ...values };
	Object.keys(normalized).forEach((key) => {
		const value = normalized[key];
		const initialValue = initialValues[key];
		if (typeof initialValue === 'object') {
			if (initialValue.hideIfDefault) {
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

export const normalizeValuesForUser = (
	values: InitialValues,
	initialValues: InitialValues
) => {
	const normalized = {};
	Object.keys(values).forEach((key) => {
		const value = normalizeValue(values[key]);
		const initialValue: InitialValuesField = initialValues[key];
		switch (
			typeof initialValue === 'object'
				? initialValue.type
				: typeof initialValue
		) {
			case 'boolean':
				normalized[key] = value === 'true';
				break;
			case 'number':
				normalized[key] = parseInt(value.toString());
				break;
			case 'object':
				throw new Error('Object cannot be assigned');
		}
	});
	return normalized;
};

export const compareValues = (
	value: string,
	initialValue: InitialValuesField
) => {
	if (typeof initialValue !== 'object') return value === initialValue;

	switch (initialValue.type) {
		case 'boolean':
			return initialValue.initial === (value === 'true');
		case 'number':
			return initialValue.initial === parseInt(value);
	}
	return value === initialValue.initial;
};
