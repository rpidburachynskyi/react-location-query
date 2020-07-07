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
import { InitialValues, InitialValuesFieldValue } from './types';
import useIndex from './useIndex';
import { setHistory } from './store';

export const useLocationQuery = (initialValues: InitialValues) => {
	const index = useIndex(); // index for save order

	setHistory(useHistory());
	useLocation(); // NO DELETE, using for rerender when change location

	useEffect(() => {
		if (Object.keys(initialValues).length === 0) return;
		addInitialValues(initialValues, index);
		calculateLocationPath();
		return () => {
			removeInitialValues(index);
			calculateLocationPath();
		};
	}, [JSON.stringify(initialValues)]);

	const currentInitialNormalizedValues = normalizeValues(initialValues);
	const initialNormalizedValues = normalizeValues(getInitialValues());

	const locationQuery = readQuery(currentInitialNormalizedValues);
	const query = extractQueryByInitialValues(
		locationQuery,
		currentInitialNormalizedValues
	);
	console.log(query);

	return {
		fullQuery: extractQueryByInitialValues(
			locationQuery,
			initialNormalizedValues
		),
		query: normalizeValuesForUser(query, initialValues) as any,
		setQueryField: (field: string, value: InitialValuesFieldValue) =>
			setQueryField(field, value)
	};
};
