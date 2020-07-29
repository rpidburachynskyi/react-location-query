import { QueryValue } from '../../../types/Query';
import { InitialExtendObjectNumber } from '../../../types/Initial/Number';
import { InitialExtendValueWrapper } from '../../../types/Initial/Initial';

const normalizeNumber = (
	value: QueryValue | InitialExtendObjectNumber,
	wrapper: InitialExtendValueWrapper<InitialExtendObjectNumber>
): number => {
	if (value !== null && typeof value === 'object' && 'type' in value) {
		return value.initial as number;
	}

	if (isNaN(+value)) {
		if (wrapper.initialValue.onParsedError) {
			const newValue = wrapper.initialValue.onParsedError(
				value as string
			);
			if (isNaN(newValue) || typeof newValue !== 'number')
				throw new Error(
					`onParsedError for type 'number' must returns number, but return '${newValue}'`
				);
			return newValue;
		} else {
			return wrapper.initialValue.initial;
		}
	}

	return +value;
};

export default normalizeNumber;
