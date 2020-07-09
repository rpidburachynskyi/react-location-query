import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
	normalizeValues,
	normalizeValuesForUser,
	addInitialValues,
	removeInitialValues,
	getInitialValues
} from '../values-controller';
import { calculateLocationPath, setQueryField } from '../location-controller';
import { extractQueryByInitialValues, readQuery } from '../query-parser';
import { InitialExtendValues, InitialExtendField } from '../types/initial';
import useIndex from '../useIndex';
import { setHistory } from '../store';

// it will be extended hook
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

	const currentInitialNormalizedValues = normalizeValues(initialValues);
	const initialNormalizedValues = normalizeValues(getInitialValues());

	const locationQuery = readQuery();
	const query = extractQueryByInitialValues(
		locationQuery,
		currentInitialNormalizedValues
	);
	return {
		fullQuery: extractQueryByInitialValues(
			locationQuery,
			initialNormalizedValues
		),
		query: normalizeValuesForUser(query, initialValues),
		setQueryField: (field: string, value: InitialExtendField) =>
			setQueryField(field, value)
	};
};

export default useLocationQueryExtend;
