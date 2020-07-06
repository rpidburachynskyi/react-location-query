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

export const useLocationQuery = (
	defaultValues: DefaultValues,
	name: string
) => {
	const history = useHistory();
	useLocation(); // NO DELETE, useing for rerender when change location

	useEffect(() => {
		console.log('UE', name);
		if (Object.keys(defaultValues).length === 0) return;
		const index = appendDefaultValues(defaultValues);
		calculateLocationPath(history.location, history);
		return () => {
			removeDefaultValues(index);
			calculateLocationPath(history.location, history);
		};
	}, []);

	const fullQuery = readQuery(
		history.location,
		normalizeValues(defaultValues)
	);
	const query = extractQueryByDefaultValues(
		fullQuery,
		normalizeValues(defaultValues)
	);

	return {
		fullQuery,
		query: normalizeValuesForUser(query, defaultValues) as any,
		setQueryField: (field: string, value: any) =>
			setQueryField(history.location, history, field, value)
	};
};
