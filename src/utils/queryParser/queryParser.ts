import qs from 'querystring';
import { InitialExtendValues } from '../../types/Initial/Initial';
import { QueryValues } from '../../types/Query';
import encryptQuery from '../crypto/encryptQuery';
import { getOptions } from '../../stores/options/options';

export const extractQueryByInitialValues = (
	query: any,
	defaultValues: InitialExtendValues
): QueryValues => {
	const result: QueryValues = {};
	Object.keys(defaultValues).forEach((key) => {
		result[key] =
			query[key] !== undefined ? query[key] : defaultValues[key];
	});
	return result;
};

export const stringifyQuery = (query: QueryValues) => {
	if (getOptions().crypto) {
		const encryptedQuery = encryptQuery(query);
		const q = qs.stringify({ q: encryptedQuery } as qs.ParsedUrlQueryInput);
		return q;
	}
	return qs.stringify(query as qs.ParsedUrlQueryInput);
};
