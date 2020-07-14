import qs from 'querystring';
import { InitialExtendValues } from '../../types/Initial/Initial';
import { getLocation, getHistory } from '../../stores/store/store';
import { QueryValues } from '../../types/Query';
import { Location } from '../../types/HistoryLocation';

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

export const parseQuery = (query: string): QueryValues => {
	return qs.parse(query === '' ? '' : query.substring(1));
};

export const stringifyQuery = (query: QueryValues) => {
	return qs.stringify(query as any);
};

export const readQuery = (): QueryValues => {
	const location: Location = getLocation();
	return parseQuery(location.search);
};

export const writeQuery = (query: QueryValues) => {
	const history = getHistory();
	const location = getLocation();
	if (Object.keys(query).length === 0) {
		history.replace(location.pathname);
	} else {
		history.replace(`${location.pathname}?${stringifyQuery(query)}`);
	}
};
