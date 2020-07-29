import { InitialExtendValueWrapper } from '../../../types/Initial/Initial';
import { InitialExtendObjectString } from '../../../types/Initial/String';

const normalizeString = (
	value: string | InitialExtendObjectString,
	wrapper: InitialExtendValueWrapper<InitialExtendObjectString>
) => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial as string;

	if (wrapper.initialValue.enum) {
		if (!wrapper.initialValue.enum.includes(value)) {
			if (wrapper.initialValue.onParsedEnumError) {
				const newValue = wrapper.initialValue.onParsedEnumError(value);

				if (!wrapper.initialValue.enum.includes(newValue))
					throw new Error(
						`'${newValue}' not contains in enum array ${wrapper.initialValue.enum}, but you passed it`
					);
				return newValue;
			} else {
				return wrapper.initialValue.initial;
			}
		}
	}

	return value;
};

export default normalizeString;
