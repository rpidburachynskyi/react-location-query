import { InitialExtendObjectNumber } from '../../../types/Initial/Number';

const normalizeNumber = (
	value: string | number | InitialExtendObjectNumber,
	initialValue: InitialExtendObjectNumber
): string => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial.toString();

	if (typeof value === 'number') {
		return value.toString();
	}

	if (isNaN(+value)) {
		if (initialValue.onParsedError) {
			const newValue = initialValue.onParsedError(value);
			if (isNaN(newValue) || typeof newValue !== 'number')
				throw new Error(
					`onParsedError for type 'number' must returns number, but return '${newValue}'`
				);
			return newValue.toString();
		} else {
			return initialValue.initial.toString();
		}
	}
	
	return value;
};

export default normalizeNumber;
