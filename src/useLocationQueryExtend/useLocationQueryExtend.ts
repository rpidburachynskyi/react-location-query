import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
	addInitialValues,
	removeInitialValues,
	getInitialValues
} from '../values-controller';
import { calculateLocationPath, setQueryField } from '../location-controller';
import { extractQueryByInitialValues, readQuery } from '../query-parser';
import { InitialExtendValues } from '../types/Initial/Initial';
import useIndex from '../useIndex';
import { setHistory } from '../store';
import { normalizeForUser } from '../utils/normalizer/normalizer';
import { normalizeForUserByInitialValues } from '../utils/normalizer/normalizeForUser';

const useLocationQueryExtend = (initialValues: InitialExtendValues) => {
	const index = useIndex(); // index for save order

	setHistory(useHistory());
	useLocation(); // NO DELETE, using for rerender when change location

	addInitialValues(initialValues, index);

	useEffect(() => {
		addInitialValues(initialValues, index);
		calculateLocationPath();
		return () => {
			removeInitialValues(index);
			calculateLocationPath();
		};
	}, [JSON.stringify(initialValues)]);

	const currentInitialNormalizedValues = initialValues;
	const initialNormalizedValues = getInitialValues();

	const locationQuery = readQuery();
	const query = extractQueryByInitialValues(
		locationQuery,
		currentInitialNormalizedValues
	);
	return {
		fullQuery: normalizeForUser(
			extractQueryByInitialValues(locationQuery, initialNormalizedValues)
		),
		query: normalizeForUserByInitialValues(query, initialValues),
		setQueryField: (field: string, value: any) =>
			setQueryField(field, value)
	};
};

export default useLocationQueryExtend;
