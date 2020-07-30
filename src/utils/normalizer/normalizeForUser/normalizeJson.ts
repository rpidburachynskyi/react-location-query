import { QueryValue } from '../../../types/Query';
import { ObjectJson } from '../../../types/Initial/Json';
import { InitialExtendValueWrapper } from '../../../types/Initial/Wrapper';

const normalizeJson = (
	value: QueryValue | ObjectJson,
	wrapper: InitialExtendValueWrapper<ObjectJson>
): object | string | number | boolean => {
	try {
		return JSON.parse(value as string);
	} catch (e) {
		if (wrapper.initialValue.onParsedError) {
			const obj = wrapper.initialValue.onParsedError(value as any);
			try {
				const newValue = obj;

				return newValue;
			} catch (e) {
				throw new Error(
					`onParsedError for type 'json' must returns js type, but return '${obj}'`
				);
			}
		} else {
			return wrapper.initialValue.initial;
		}
	}
};

export default normalizeJson;
