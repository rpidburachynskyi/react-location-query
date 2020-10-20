import {
	getInitialValuesWrappers,
	setInitialValuesWrappers
} from './valuesController';
import { Context } from '../../../context/context';
import { InitialExtendValueWrapper } from '../../../types/Initial/Wrapper';
import { InitialObjectType } from '../../../types/Initial/Initial';

export const deleteUnmarkedWrappers = (context: Context): void => {
	const wrappers = getInitialValuesWrappers(context);
	setInitialValuesWrappers(
		Object.keys(wrappers)
			.filter((key) => filter(wrappers[key]))
			.reduce((prev, key) => ({ ...prev, [key]: wrappers[key] }), {}),
		context
	);
};

const filter = (wrapper: InitialExtendValueWrapper<InitialObjectType>) => {
	if (wrapper.marked === false) return false;
	if (wrapper.initialValue.active === false) return false;
	if (typeof wrapper.initialValue.active === 'object') {
		if (wrapper.initialValue.active.isActive === false)
			return wrapper.initialValue.active.storeValue;
	}

	return true;
};
