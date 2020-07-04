let defaultValues: object[] = [];
let truthValues: object = {};

export const normalizeValues = (values: object) => {
	const normalized: any = { ...values };
	Object.keys(normalized).forEach((key) => {
		const value = normalized[key];
		if (typeof value === 'object') {
			switch (value.type) {
				case 'boolean':
					normalized[key] = value.default === 'true' ? true : false;
					break;
				case 'string':
				default:
					normalized[key] = value.default;
			}
		}
	});
	return normalized;
};

export const normalizeValuesForLocation = (
	values: object,
	defaultValues: any
) => {
	const normalized: any = { ...values };
	Object.keys(normalized).forEach((key) => {
		const value = normalized[key];
		const defaultValue = defaultValues[key];
		if (typeof defaultValue === 'object') {
			if (defaultValue.hideIfDefault) {
				if (typeof value === 'object') {
					if (value.default === defaultValue.default) {
						delete normalized[key];
					}
				} else {
					if (value === defaultValue.default) {
						delete normalized[key];
					}
				}
			} else {
				if (typeof value === 'object') {
					normalized[key] = value.default;
				} else {
					normalized[key] = value;
				}
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
			if (defaultValue.type === 'boolean') {
				normalized[key] = value === 'true' ? true : false;
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
