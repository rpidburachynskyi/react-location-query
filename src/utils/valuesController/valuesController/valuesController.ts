import { InitialExtendValues } from '../../../types/Initial/Initial';
import { InitialExtendValuesWrappers } from '../../../types/Initial/Wrapper';
import { Context } from '../../../context/context';

export const setInitialValuesWrappers = (
	newInitialExtendValuesWrappers: InitialExtendValuesWrappers[],
	context: Context
) => {
	context.initialValuesWrappers = newInitialExtendValuesWrappers;
};

export const getInitialValuesWrappers = (context: Context) => {
	let initialValuesWrappersArray: InitialExtendValuesWrappers = {};
	context.initialValuesWrappers.forEach((initialValuesWrappersItem) => {
		initialValuesWrappersArray = {
			...initialValuesWrappersArray,
			...Object.keys(initialValuesWrappersItem)
				.map((key) => initialValuesWrappersItem[key])
				.reduce((p, c) => ({ ...p, [c.name]: c }), {})
		};
	});
	return initialValuesWrappersArray;
};

export const getInitialValues = (context: Context) => {
	let initialValues: InitialExtendValues = {};
	context.initialValuesWrappers.forEach((initialValuesWrapper) => {
		initialValues = {
			...initialValues,
			...Object.keys(initialValuesWrapper)
				.map((key) => initialValuesWrapper[key])
				.reduce((p, c) => ({ ...p, [c.name]: c.initialValue }), {})
		};
	});
	return initialValues;
};

export const getInitialValueByFieldName = (
	fieldName: string,
	context: Context
) => getInitialValues(context)[fieldName];
