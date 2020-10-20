import { getInitialValuesWrappers } from './valuesController';
import { Context } from '../../../context/context';

export const unmarkAllInitialValuesWrappers = (context: Context): void => {
	const wrappers = getInitialValuesWrappers(context);
	Object.keys(wrappers).map((key) => (wrappers[key].marked = false));
};
