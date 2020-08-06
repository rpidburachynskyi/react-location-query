import qs from 'querystring';
import { InitialExtendValues } from '../../types/Initial/Initial';
import { QueryValues } from '../../types/Query';
import encryptQuery from '../crypto/encryptQuery';
import CryptoOptions from '../../stores/options/types/CryptoOptions/CryptoOptions';

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

export const stringifyQuery = (query: QueryValues, crypto: CryptoOptions) => {
	prepareQuery(query);
	if (crypto.method !== 'none') {
		const encryptedQuery = encryptQuery(query, crypto);
		const q = qs.stringify({ q: encryptedQuery } as qs.ParsedUrlQueryInput);
		return q;
	}
	return qs.stringify(query as qs.ParsedUrlQueryInput);
};

const prepareQuery = (query: QueryValues) => {
	Object.keys(query).forEach((key) => {
		const value = query[key];

		if (typeof value === 'object' && !Array.isArray(value)) {
			query[key] = JSON.stringify(value);
		}
	});
};
