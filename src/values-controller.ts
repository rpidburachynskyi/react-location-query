let defaultValues: object[] = [];
let truthValues: object = {};

export const normalizeValues = (values: object) => {
	const normalized: any = { ...values };
	Object.keys(normalized).forEach((key) => {
		const value = normalized[key];
		if (typeof value === 'object') {
			switch (value.type) {
				case 'boolean':
					normalized[key] = value.default === 'true';
					break;
				case 'string':
				default:
					normalized[key] = value.default;
			}
		}
	});
	return normalized;
};

const normalizeValue = (value: any) => {
	return typeof value === 'object' ? value.default : value;
};

export const prepareValuesForLocation = (
	values: object,
	defaultValues: any
) => {
	const normalized: any = { ...values };
	Object.keys(normalized).forEach((key) => {
		const value = normalized[key];
		const defaultValue = defaultValues[key];
		if (typeof defaultValue === 'object') {
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

export const appendDefaultValues = (values: object) => {
	defaultValues = [...defaultValues, values];
	return defaultValues.length - 1;
};

export const removeDefaultValues = (index: number) => {
	defaultValues.splice(index, 1);
};

export const setTruthValues = (values: object) => {
	truthValues = values;
};

export const getTruthValues = () => {
	return truthValues;
};

export const compareValues = (value: any, defaultValue: any) => {
	if (typeof defaultValue === 'object') {
		if (typeof value === 'object') {
			return value.default === defaultValue.default;
		} else {
			switch (defaultValue.type) {
				case 'boolean':
					return defaultValue.default === (value === 'true');
				case 'number':
					return defaultValue.default === parseInt(value as string);
			}
			return value === defaultValue.default;
		}
	} else {
		return value === defaultValue;
	}
};
