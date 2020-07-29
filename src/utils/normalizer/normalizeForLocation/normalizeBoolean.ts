import { InitialExtendObjectBoolean } from '../../../types/Initial/Boolean';
import { QueryValue } from '../../../types/Query';

const normalizeBoolean = (
	value: string | QueryValue | InitialExtendObjectBoolean,
	initialValue: InitialExtendObjectBoolean
): string => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial ? 'true' : 'false';

	if (typeof value === 'string')
		if (value === 'true' || value === 'false') return value;

	if (typeof value === 'boolean') return value ? 'true' : 'false';

	if (initialValue.onParsedError) {
		return initialValue.onParsedError(value as string) ? 'true' : 'false';
	}

	return initialValue.initial ? 'true' : 'false';
};

export default normalizeBoolean;
