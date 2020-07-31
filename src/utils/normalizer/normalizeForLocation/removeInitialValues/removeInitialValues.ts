import { Context } from '../../../../context/context';
import { getInitialValues } from '../../../valuesController/valuesController/valuesController';
import isRemoveInitialValue from './isRemoveInitialValue';

const removeInitialValues = (
	query: { [path: string]: string },
	context: Context
) => {
	const initialValues = getInitialValues(context);
	const locationQuery = { ...query };
	Object.keys(query).forEach((key) => {
		const value = query[key];
		const initialValue = initialValues[key];

		if (!initialValue.hideIfInitial) return;

		if (isRemoveInitialValue(value, initialValue)) {
			delete locationQuery[key];
		}
	});

	return locationQuery;
};

export default removeInitialValues;
