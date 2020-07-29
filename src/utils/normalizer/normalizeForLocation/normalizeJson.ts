import { QueryValue } from '../../../types/Query';
import { InitialExtendObjectJson } from '../../../types/Initial/Json';

const normalizeJson = (
	value: string | QueryValue | InitialExtendObjectJson
): string => {
	if (typeof value === 'object' && 'type' in value)
		return JSON.stringify(value.initial);

	if (typeof value === 'object') return JSON.stringify(value);

	return value.toString();
};

export default normalizeJson;
