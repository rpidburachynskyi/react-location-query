import {
	InitialExtendValue,
	InitialObjectType
} from '../../../types/Initial/Initial';
import {
	getInitialValuesWrappers,
	setInitialValuesWrappers
} from './valuesController';
import checkInitialValue from '../checkInitialValue';
import { Context } from '../../../context/context';
import { InitialExtendValueWrapper } from '../../../types/Initial/Wrapper';

export const addInitialValue = (
	name: string,
	initialValue: InitialObjectType,
	index: number,
	context: Context
): void => {
	checkInitialValue(initialValue);

	const wrappers = getInitialValuesWrappers(context);

	if (wrappers[name]) {
		wrappers[name].marked = true;
		wrappers[name].index = index;
		wrappers[name].initialValue = initialValue;
		wrappers[name].name = name;
	} else {
		const wrapper: InitialExtendValueWrapper<InitialExtendValue> = {
			index,
			initialValue,
			name,
			marked: true,
			storedValue: undefined
		};
		wrappers[name] = wrapper;

		setInitialValuesWrappers(
			{ ...context.initialValuesWrappers, [name]: wrapper },
			context
		);
	}
};
