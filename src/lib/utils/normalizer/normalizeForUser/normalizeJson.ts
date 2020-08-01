import { ObjectJson } from '../../../types/Initial/Json';

const normalizeJson = (
	value: string | string[] | object | number | boolean | ObjectJson,
	initialValue: ObjectJson
): object | string | number | boolean => {
	if (Array.isArray(value)) return normalizeJson(value[0], initialValue);

	if (typeof value === 'object') {
		if ('type' in value) return initialValue.initial;
		return value;
	}
	try {
		if (!isNaN(+value) || value === 'true' || value === 'false')
			return JSON.parse(`${value}`);

		return JSON.parse(value as any);
	} catch (e) {
		if (initialValue.onParsedError) {
			const obj = initialValue.onParsedError(value as any);
			try {
				const newValue = obj;

				return newValue;
			} catch (e) {
				throw new Error(
					`onParsedError for type 'json' must returns js type, but return '${obj}'`
				);
			}
		} else {
			return initialValue.initial;
		}
	}
};

export default normalizeJson;
