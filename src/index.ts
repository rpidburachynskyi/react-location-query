import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
	appendDefaultValues,
	removeDefaultValues,
	normalizeValues,
	normalizeValuesForUser,
	appendOptions,
	removeOptions,
	getDefaultValues
} from './values-controller';
import { calculateLocationPath, setQueryField } from './location-controller';
import { extractQueryByDefaultValues, readQuery } from './query-parser';
import { DefaultValues, Options } from './types';

export const useLocationQuery = (
	defaultValues: DefaultValues,
	options: Options = {
		sort: 'alphabet',
		sortOrder: 'asc'
	}
) => {
	const history = useHistory();
	useLocation(); // NO DELETE, useing for rerender when change location

	useEffect(() => {
		if (Object.keys(defaultValues).length === 0) return;
		const index = appendDefaultValues(defaultValues);
		const optionsIndex = appendOptions(options);
		calculateLocationPath(history.location, history);
		return () => {
			removeDefaultValues(index);
			removeOptions(optionsIndex);
			calculateLocationPath(history.location, history);
		};
	}, []);

	const locationQuery = readQuery(
		history.location,
		normalizeValues(defaultValues)
	);
	const query = extractQueryByDefaultValues(
		locationQuery,
		normalizeValues(defaultValues)
	);

	return {
		fullQuery: extractQueryByDefaultValues(
			locationQuery,
			normalizeValues(getDefaultValues())
		),
		query: normalizeValuesForUser(query, defaultValues) as any,
		setQueryField: (field: string, value: any) =>
			setQueryField(history.location, history, field, value)
	};
};
