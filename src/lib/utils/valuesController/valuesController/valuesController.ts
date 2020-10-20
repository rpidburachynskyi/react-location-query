import { InitialExtendValues } from '../../../types/Initial/Initial';
import { InitialExtendValuesWrappers } from '../../../types/Initial/Wrapper';
import { Context } from '../../../context/context';

export const setInitialValuesWrappers = (
	newInitialExtendValuesWrappers: InitialExtendValuesWrappers,
	context: Context
) => {
	context.initialValuesWrappers = newInitialExtendValuesWrappers;
};

export const getInitialValuesWrappers = (context: Context) => {
	// let initialValuesWrappersArray: InitialExtendValuesWrappers = {};
	// context.initialValuesWrappers.forEach((initialValuesWrappersItem) => {
	// 	initialValuesWrappersArray = {
	// 		...initialValuesWrappersArray,
	// 		...Object.keys(initialValuesWrappersItem)
	// 			.map((key) => initialValuesWrappersItem[key])
	// 			.reduce((p, c) => ({ ...p, [c.name]: c }), {})
	// 	};
	// });
	// return initialValuesWrappersArray;

	return context.initialValuesWrappers;
};

export const getInitialValuesWrapper = (
	fieldName: string,
	context: Context
) => {
	return getInitialValuesWrappers(context)[fieldName];
};

export const getInitialValues = (context: Context) => {
	let initialValues: InitialExtendValues = {};
	Object.keys(context.initialValuesWrappers).forEach((key) => {
		const initialValuesWrapper = context.initialValuesWrappers[key];
		initialValues = {
			...initialValues,
			[initialValuesWrapper.name]: initialValuesWrapper.initialValue
		};
	});
	return initialValues;
};

export const getInitialValueByFieldName = (
	fieldName: string,
	context: Context
) => getInitialValues(context)[fieldName];
