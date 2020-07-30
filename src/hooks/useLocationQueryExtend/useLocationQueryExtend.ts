import { useEffect } from 'react';
import {
	addInitialValues,
	removeInitialValues,
	getInitialValues
} from '../../utils/valuesController/valuesController';
import {
	calculateLocationPath,
	setQueryField
} from '../../utils/locationController/locationController';
import { extractQueryByInitialValues } from '../../utils/queryParser/queryParser';
import { InitialExtendValues } from '../../types/Initial/Initial';
import useIndex from '../useIndex';
import {
	normalizeForUser,
	normalizeForUserByInitialValues
} from '../../utils/normalizer/normalizer';
import { hashFromObject } from '../../utils/objects';
import readQuery from '../../utils/queryParser/readQuery';

const useLocationQueryExtend = (initialValues: InitialExtendValues = {}) => {
	const index = useIndex(); // index for save order

	addInitialValues(initialValues, index);

	useEffect(() => {
		calculateLocationPath();
		addInitialValues(initialValues, index);
		return () => {
			removeInitialValues(initialValues);
			calculateLocationPath();
		};
	}, [hashFromObject(initialValues)]);

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
		setQueryField
	};
};

export default useLocationQueryExtend;
