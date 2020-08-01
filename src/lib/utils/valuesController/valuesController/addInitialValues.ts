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

	wrapper[name] = {
		index,
		initialValue,
		name
	};

	setInitialValuesWrappers(
		[...context.initialValuesWrappers, wrapper],
		context
	);
};
