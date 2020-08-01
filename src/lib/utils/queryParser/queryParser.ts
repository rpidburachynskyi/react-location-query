import qs from 'querystring';
import { InitialExtendValues } from '../../types/Initial/Initial';
import { QueryValues } from '../../types/Query';
import encryptQuery from '../crypto/encryptQuery';
import Options from '../../types/Options';

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

export const stringifyQuery = (query: QueryValues, options: Options) => {
	if (options.crypto) {
		const encryptedQuery = encryptQuery(query, options);
		const q = qs.stringify({ q: encryptedQuery } as qs.ParsedUrlQueryInput);
		return q;
	}
	return qs.stringify(query as qs.ParsedUrlQueryInput);
};
