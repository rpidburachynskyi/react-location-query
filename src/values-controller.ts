import { DefaultValueField, DefaultValues, Options } from './types';

let defaultValues: DefaultValues[] = [];
let optionses: Options[] = [];

export const normalizeValues = (values: object) => {
	const normalized: any = { ...values };
	Object.keys(normalized).forEach((key) => {
		const value = normalized[key];
		if (typeof value === 'object') {
			switch (value.type) {
				case 'boolean':
					switch (value.type) {
						case 'boolean':
							normalized[key] = value.default;
							break;
						case 'string':
							normalized[key] = value.default === 'true';
							break;
					}
					break;
				case 'string':
				default:
					normalized[key] = value.default;
			}
		}
	});
	return normalized;
};

const normalizeValue = (value: DefaultValueField) => {
	return typeof value === 'object' ? value.default : value;
};

export const prepareValuesForLocation = (
	values: object,
	defaultValues: DefaultValues
) => {
	const normalized: any = { ...values };
	Object.keys(normalized).forEach((key) => {
		const value = normalized[key];
		const defaultValue = defaultValues[key];
		if (typeof defaultValue === 'object') {
			// if (!checkValue(value, defaultValue)) {
			// 	if (defaultValue.onPassedUncorrectValue) {
			// 		value = defaultValue.onPassedUncorrectValue(value);
			// 	}
			// }
			if (defaultValue.hideIfDefault) {
				if (compareValues(value, defaultValue)) {
					delete normalized[key];
				}
			} else {
				normalized[key] = normalizeValue(value);
			}
		}
	});
	return normalized;
};

export const normalizeValuesForUser = (values: any, defaultValues: any) => {
	const normalized = { ...values };
	Object.keys(normalized).forEach((key) => {
		const value = normalized[key];
		const defaultValue = defaultValues[key];
		if (typeof defaultValue === 'object') {
			switch (defaultValue.type) {
				case 'boolean':
					normalized[key] = value === 'true';
					break;
				case 'number':
					normalized[key] = parseInt(value);
					break;
			}
		} else {
			switch (typeof defaultValue) {
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

export const getDefaultValues = () => {
	let normalized = {};
	defaultValues.forEach((storedValue) => {
		normalized = { ...normalized, ...storedValue };
	});

	return normalized;
};

export const getNormalizedStoredValues = () => {
	let normalized = {};
	defaultValues.forEach((storedValue) => {
		normalized = { ...normalized, ...storedValue };
	});

	normalized = normalizeValues(normalized);

	return normalized;
};

export const appendDefaultValues = (values: DefaultValues) => {
	defaultValues = [...defaultValues, values];
	return defaultValues.length - 1;
};

export const removeDefaultValues = (index: number) => {
	defaultValues.splice(index, 1);
};

export const checkValue = (
	value: DefaultValueField | string,
	defaultValue: DefaultValueField
) => {
	if (typeof value === 'object') return true;
	switch (typeof defaultValue) {
		case 'boolean':
			return value === 'true' || value === 'false';
	}
	return false;
};

export const compareValues = (value: any, defaultValue: any) => {
	if (typeof defaultValue === 'object') {
		if (typeof value === 'object') {
			return value.default === defaultValue.default;
		} else {
			switch (defaultValue.type) {
				case 'boolean':
					switch (typeof value) {
						case 'string':
							return defaultValue.default === (value === 'true');
						case 'boolean':
							return defaultValue.default === value;
						default:
							throw new Error(
								`Bad compare with type boolean, actually (${typeof value})`
							);
					}
				case 'number':
					switch (typeof value) {
						case 'string':
							return (
								defaultValue.default ===
								parseInt(value as string)
							);
						case 'number':
							return defaultValue.default === value;
						default:
							throw new Error(
								`Bad compare with type number, actually (${typeof value}`
							);
					}
			}
			return value === defaultValue.default;
		}
	} else {
		return value === defaultValue;
	}
};

export const getOptions = (): Options => {
	let normalized = {};
	optionses.forEach((options) => {
		normalized = { ...normalized, ...options };
	});

	return normalized as Options;
};

export const appendOptions = (options: Options) => {
	optionses = [...optionses, options];
	return optionses.length - 1;
};

export const removeOptions = (index: number) => {
	optionses.splice(index, 1);
};
