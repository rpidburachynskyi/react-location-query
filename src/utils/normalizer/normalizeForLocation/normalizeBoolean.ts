import { ObjectBoolean } from '../../../types/Initial/Boolean';
import normalizeBoolean from '../normalizeForUser/normalizeBoolean';

const normalizeBoolean1 = (
	value: string | boolean | ObjectBoolean,
	initialValue: ObjectBoolean
): string => {
	return normalizeBoolean(value as any, initialValue) ? 'true' : 'false';
};

export default normalizeBoolean1;
