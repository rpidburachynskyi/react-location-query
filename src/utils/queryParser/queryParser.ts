import qs from 'querystring';
import { InitialExtendValues } from '../../types/Initial/Initial';
import { getLocation, getHistory } from '../../stores/store/store';
import { QueryValues } from '../../types/Query';
import { Location } from '../../types/HistoryLocation';
import encryptQuery from '../crypto/encryptQuery';
import decryptQuery from '../crypto/decryptQuery';
import { getOptions } from '../../stores/options/options';
import { compareObjects } from '../objects';
import { getInitialValueByFieldName } from '../valuesController/valuesController';

export const extractQueryValueByName = (name: string): QueryValues => {
	const query = readQuery();
	const initialValue = getInitialValueByFieldName(name);
	const result: QueryValues = {};
	result[name] =
		query[name] !== undefined
			? query[name]
			: { [name]: initialValue }[name];
	return result;
};

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

export const readQuery = (): QueryValues => {
	const location: Location = getLocation();
	return parseQuery(location.search);
};

export const writeQuery = (query: QueryValues) => {
	if (compareObjects(query, readQuery())) return;
	console.log(query, readQuery());
	const preparedQuery = stringifyQuery(query);
	const history = getHistory();
	const location = getLocation();
	if (Object.keys(query).length === 0) {
		history.replace(location.pathname);
	} else {
		history.replace(`${location.pathname}?${preparedQuery}`);
	}
};

const parseQuery = (query: string): QueryValues => {
	try {
		const q = qs.parse(query === '' ? '' : query.substring(1));
		if (getOptions().crypto) {
			if (q.q as any) return decryptQuery(q.q as any);
			return {};
		}
		return q;
	} catch (e) {
		return {};
	}
};

export const stringifyQuery = (query: QueryValues) => {
	if (getOptions().crypto) {
		const encryptedQuery = encryptQuery(query);
		const q = qs.stringify({ q: encryptedQuery } as qs.ParsedUrlQueryInput);
		return q;
	}
	return qs.stringify(query as qs.ParsedUrlQueryInput);
};
