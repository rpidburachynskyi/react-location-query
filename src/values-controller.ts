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
	return typeof value === 'object' ? value.initial : value;
};

export const normalizeValues = (values: object) => {
	const normalized: any = { ...values };
	Object.keys(normalized).forEach((key) => {
		const value = normalized[key];
		if (typeof value === 'object') {
			switch (value.type) {
				case 'boolean':
					switch (value.type) {
						case 'boolean':
							normalized[key] = value.initial;
							break;
						case 'string':
							normalized[key] = value.initial === 'true';
							break;
					}
					break;
				case 'string':
				default:
					normalized[key] = value.initial;
			}
		}
	});
	return normalized;
};
export const prepareValuesForLocation = (
	values: object,
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
	values: any,
	initialValues: InitialValues
) => {
	const normalized = {};
	Object.keys(values).forEach((key) => {
		const value = values[key];
		const initialValue: InitialValuesField = initialValues[key];
		if (typeof initialValue === 'object') {
			switch (initialValue.type) {
				case 'boolean':
					normalized[key] = value === 'true';
					break;
				case 'number':
					normalized[key] = parseInt(value);
					break;
			}
		} else {
			switch (typeof initialValue) {
				case 'boolean':
					normalized[key] = value === 'true';
					break;
				case 'number':
					normalized[key] = parseInt(value);
					break;
			}
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
	return true;
};
