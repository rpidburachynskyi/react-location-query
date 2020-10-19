import { InitialObjectType } from '../../../types/Initial/Initial';
import { setInitialValuesWrappers } from './valuesController';
import { InitialExtendValuesWrappers } from '../../../types/Initial/Wrapper';
import checkInitialValue from '../checkInitialValue';
import { Context } from '../../../context/context';

export const addInitialValue = (
	name: string,
	initialValue: InitialObjectType,
	index: number,
	context: Context
): void => {
	const wrapper: InitialExtendValuesWrappers = {};
	checkInitialValue(initialValue);

	if (!wrapper[name]) {
		wrapper[name] = {
			index,
			initialValue,
			name,
			storedValue: undefined
		};
	} else {
		wrapper[name].index = index;
		wrapper[name].initialValue = initialValue;
		wrapper[name].name = name;
	}

	setInitialValuesWrappers(
		[...context.initialValuesWrappers, wrapper],
		context
	);
};
