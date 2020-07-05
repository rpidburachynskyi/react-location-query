import qs from 'querystring';

export const extractQueryByDefaultValues = (query: any, defaultValues: any) => {
	const result: any = {};
	Object.keys(defaultValues).forEach((key) => {
		result[key] = query[key] ? query[key] : defaultValues[key];
	});

	return result;
};

export const parseQuery = (query: string) => {
	return qs.parse(query === '' ? '' : query.substring(1));
};

export const stringifyQuery = (query: object) => {
	return qs.stringify({ ...query });
};

export const readQuery = (location: any, defaultValues: object) => {
	return { ...defaultValues, ...parseQuery(location.search) };
};
