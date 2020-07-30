import { InitialExtendValue } from '../../../types/Initial/Initial';
import {
	initialValuesWrappers,
	setInitialValuesWrappers
} from './valuesController';
import { compareObjects } from '../../objects';

export const removeInitialValue = (
	name: string,
	initialValue: InitialExtendValue
) => {
	setInitialValuesWrappers(
		initialValuesWrappers.filter((v) => {
			if (!v[name]) {
				return true;
			}

			return !compareObjects(v[name].initialValue, initialValue);
		})
	);
};
