import { InitialExtendObjectBoolean } from '../../../types/Initial/Boolean';
import { QueryValue } from '../../../types/Query';
import normalizeBoolean from '../normalizeForUser/normalizeBoolean';

const normalizeBoolean1 = (
	value: string | QueryValue | InitialExtendObjectBoolean,
	initialValue: InitialExtendObjectBoolean
): string => {
	return normalizeBoolean(value, initialValue) ? 'true' : 'false';
};

export default normalizeBoolean1;
