import { InitialExtendValue } from '../../../types/Initial/Initial';
import {
	initialValuesWrappers,
	setInitialValuesWrappers
} from './valuesController';
import { InitialExtendValuesWrappers } from '../../../types/Initial/Wrapper';
import mutateValueToObjectValues from './mutateValueToObjectValues';
import checkInitialValue from '../checkInitialValue';
import { removeInitialValue } from './removeInitialValues';

export const addInitialValue = (
	name: string,
	initialValue: InitialExtendValue,
	index: number
): InitialExtendValue | undefined => {
	if (initialValue === undefined) return;

	const wrapper: InitialExtendValuesWrappers = {};
	const newInitialValue = mutateValueToObjectValues(initialValue);
	removeInitialValue(name, newInitialValue);

	checkInitialValue(newInitialValue);

	wrapper[name] = {
		index,
		initialValue: newInitialValue,
		name
	};

	setInitialValuesWrappers([...initialValuesWrappers, wrapper]);

	return newInitialValue;
};
