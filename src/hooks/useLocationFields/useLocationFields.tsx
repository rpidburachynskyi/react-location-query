import useIndex from '../useIndex';
import { useContext } from 'react';
import Context from '../../lib/context/context';
import { InitialObjectType } from '../../lib/types/Initial/Initial';
import transformToInitialValue from '../../lib/utils/valuesController/valuesController/transformInitialValues';
import { addInitialValue } from '../../lib/utils/valuesController/valuesController/addInitialValues';
import { normalizeValueForUser } from '../../lib/utils/normalizer/normalizeForUser/normalizeForUser';
import { setQueryFieldValue } from '../../lib/utils/locationController/locationController';
import { getInitialValueByFieldName } from '../../lib/utils/valuesController/valuesController/valuesController';
import { ActionOnChange } from '../../lib/types/ActionOnChange';

type Values = {
	[name: string]: InitialObjectType | string | number | boolean;
};

function useLocationFields(
	values: Values
): {
	values: object;
	setQueryField: (
		name: string,
		value: any,
		actionOnChange?: ActionOnChange
	) => void;
};

function useLocationFields(values: Values = {}) {
	const index = useIndex();
	const context = useContext(Context);

	if (!context)
		throw new Error(
			'You must use useLocationFields hook inside BrowserLocationQuery'
		);

	const keys = Object.keys(values);
	if (keys.length !== 0) {
		keys.forEach((name) => {
			const value = values[name];
			const initialValue: InitialObjectType = transformToInitialValue(
				value,
				context
			);
			console.log(initialValue);

			addInitialValue(name, initialValue, index, context);
			context.query[name] = normalizeValueForUser(
				context.query[name],
				initialValue
			);
		});
	}

	return {
		values: keys.reduce(
			(p, name) => ({ ...p, name: context.query[name] }),
			{}
		),
		setQueryField: (
			name: 'string',
			newValue: any,
			actionOnChange: 'Push' | 'Replace'
		) => {
			const initial = getInitialValueByFieldName(name, context);
			return setQueryFieldValue(
				name,
				newValue,
				context,
				actionOnChange
					? actionOnChange
					: initial.actionOnChange
					? initial.actionOnChange
					: 'Replace'
			);
		}
	};
}

export default useLocationFields;
