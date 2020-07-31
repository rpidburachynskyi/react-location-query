import { InitialExtendValue } from '../../../types/Initial/Initial';
import { setInitialValuesWrappers } from './valuesController';
import { compareObjects } from '../../objects';
import { Context } from '../../../context/context';

export const removeInitialValue = (
	name: string,
	initialValue: InitialExtendValue,
	context: Context
) => {
	setInitialValuesWrappers(
		context.initialValuesWrappers.filter((v) => {
			if (!v[name]) {
				return true;
			}

			return !compareObjects(v[name].initialValue, initialValue);
		}),
		context
	);
};
