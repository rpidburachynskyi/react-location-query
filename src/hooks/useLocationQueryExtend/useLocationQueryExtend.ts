import { useHistory, useLocation } from 'react-router-dom';
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
import {
	extractQueryByInitialValues,
	readQuery
} from '../../utils/queryParser/queryParser';
import { InitialExtendValues } from '../../types/Initial/Initial';
import useIndex from '../useIndex';
import { setHistory } from '../../stores/store/store';
import {
	normalizeForUser,
	normalizeForUserByInitialValues
} from '../../utils/normalizer/normalizer';
import { hashFromObject } from '../../utils/objects';

const useLocationQueryExtend = (initialValues: InitialExtendValues = {}) => {
	const index = useIndex(); // index for save order

	setHistory(useHistory());
	useLocation(); // NO DELETE, using for rerender when change location

	addInitialValues(initialValues, index);

	useEffect(() => {
		setTimeout(() => {
			calculateLocationPath();
		}, 0);
		addInitialValues(initialValues, index);
		return () => {
			removeInitialValues(initialValues);
			setTimeout(() => {
				calculateLocationPath();
			}, 0);
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
