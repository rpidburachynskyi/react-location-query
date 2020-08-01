import { QueryValue } from '../../../types/Query';
import { ObjectJson } from '../../../types/Initial/Json';

const normalizeJson = (value: string | QueryValue | ObjectJson): string => {
	if (typeof value === 'object' && 'type' in value)
		return JSON.stringify(value.initial);

	if (typeof value === 'object') return JSON.stringify(value);

	return JSON.stringify(value);
};

export default normalizeJson;
