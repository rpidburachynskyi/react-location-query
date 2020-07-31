import { InitialExtendValue } from '../../../types/Initial/Initial';
import { setInitialValuesWrappers } from './valuesController';
import { InitialExtendValuesWrappers } from '../../../types/Initial/Wrapper';
import mutateValueToObjectValues from './mutateValueToObjectValues';
import checkInitialValue from '../checkInitialValue';
import { removeInitialValue } from './removeInitialValues';
import { Context } from '../../../context/context';

export const addInitialValue = (
	name: string,
	initialValue: InitialExtendValue,
	index: number,
	context: Context
): InitialExtendValue | undefined => {
	if (initialValue === undefined) return;

	const wrapper: InitialExtendValuesWrappers = {};
	const newInitialValue = mutateValueToObjectValues(initialValue);
	removeInitialValue(name, newInitialValue, context);

	checkInitialValue(newInitialValue);

	wrapper[name] = {
		index,
		initialValue: newInitialValue,
		name
	};

	setInitialValuesWrappers(
		[...context.initialValuesWrappers, wrapper],
		context
	);

	return newInitialValue;
};
