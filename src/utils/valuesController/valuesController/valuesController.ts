import { InitialExtendValues } from '../../../types/Initial/Initial';
import { InitialExtendValuesWrappers } from '../../../types/Initial/Wrapper';

export let initialValuesWrappers: InitialExtendValuesWrappers[] = [];

export const setInitialValuesWrappers = (
	newInitialExtendValuesWrappers: InitialExtendValuesWrappers[]
) => {
	initialValuesWrappers = newInitialExtendValuesWrappers;
};

export const getInitialValuesWrappers = () => {
	let initialValuesWrappersArray: InitialExtendValuesWrappers = {};
	initialValuesWrappers.forEach((initialValuesWrappersItem) => {
		initialValuesWrappersArray = {
			...initialValuesWrappersArray,
			...Object.keys(initialValuesWrappersItem)
				.map((key) => initialValuesWrappersItem[key])
				.reduce((p, c) => ({ ...p, [c.name]: c }), {})
		};
	});
	return initialValuesWrappersArray;
};

export const getInitialValues = () => {
	let initialValues: InitialExtendValues = {};
	initialValuesWrappers.forEach((initialValuesWrapper) => {
		initialValues = {
			...initialValues,
			...Object.keys(initialValuesWrapper)
				.map((key) => initialValuesWrapper[key])
				.reduce((p, c) => ({ ...p, [c.name]: c.initialValue }), {})
		};
	});
	return initialValues;
};

export const getInitialValueByFieldName = (fieldName: string) =>
	getInitialValues()[fieldName];
