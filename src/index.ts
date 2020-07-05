import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
	appendDefaultValues,
	removeDefaultValues,
	normalizeValues,
	normalizeValuesForUser
} from './values-controller';
import { calculateLocationPath, setQueryField } from './location-controller';
import { extractQueryByDefaultValues, readQuery } from './query-parser';
import { DefaultValues } from './types';

export const useLocationQuery = (defaultValues: DefaultValues) => {
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		const index = appendDefaultValues(defaultValues);
		calculateLocationPath(location, history);
		return () => {
			removeDefaultValues(index);
			calculateLocationPath(location, history);
		};
	}, []);

	const fullQuery = readQuery(location, normalizeValues(defaultValues));
	const query = extractQueryByDefaultValues(
		fullQuery,
		normalizeValues(defaultValues)
	);

	return {
		fullQuery,
		query: normalizeValuesForUser(query, defaultValues) as any,
		setQueryField: (field: string, value: any) =>
			setQueryField(location, history, field, value)
	};
};
