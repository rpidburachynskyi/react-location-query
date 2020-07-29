import { QueryValue } from '../../../types/Query';
import { InitialExtendValueWrapper } from '../../../types/Initial/Initial';
import { InitialExtendObjectJson } from '../../../types/Initial/Json';

const normalizeJson = (
	value: QueryValue | InitialExtendObjectJson,
	wrapper: InitialExtendValueWrapper<InitialExtendObjectJson>
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
