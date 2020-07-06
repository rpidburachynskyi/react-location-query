import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
	normalizeValues,
	normalizeValuesForUser,
	addInitialValues,
	removeInitialValues,
	getInitialValues
} from './values-controller';
import { calculateLocationPath, setQueryField } from './location-controller';
import { extractQueryByInitialValues, readQuery } from './query-parser';
import { InitialValues } from './types';
import useIndex from './useIndex';

export const useLocationQuery = (initialValues: InitialValues) => {
	const history = useHistory();
	useLocation(); // NO DELETE, using for rerender when change location
	const index = useIndex();

	useEffect(() => {
		if (Object.keys(initialValues).length === 0) return;
		addInitialValues(initialValues, index);
		calculateLocationPath(history.location, history);
		return () => {
			removeInitialValues(index);
			calculateLocationPath(history.location, history);
		};
	}, [JSON.stringify(initialValues)]);

	const currentInitialNormalizedValues = normalizeValues(initialValues);
	const initialNormalizedValues = normalizeValues(getInitialValues());

	const locationQuery = readQuery(
		history.location,
		currentInitialNormalizedValues
	);
	const query = extractQueryByInitialValues(
		locationQuery,
		currentInitialNormalizedValues
	);

	return {
		fullQuery: extractQueryByInitialValues(
			locationQuery,
			initialNormalizedValues
		),
		query: normalizeValuesForUser(query, initialValues) as any,
		setQueryField: (field: string, value: any) =>
			setQueryField(history.location, history, field, value)
	};
};
