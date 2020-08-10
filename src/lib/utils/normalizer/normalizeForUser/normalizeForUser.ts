import {
	InitialExtendValues,
	InitialExtendValue
} from '../../../types/Initial/Initial';
import { UserValues } from '../../../types/User';
import { getInitialValuesWrappers } from '../../valuesController/valuesController/valuesController';
import normalizeBoolean from '../normalizeBoolean/normalizeBoolean';
import normalizeJson from './normalizeJson';
import normalizeArray from './normalizeArray';
import { QueryValues, QueryValue } from '../../../types/Query';
import { InitialExtendValuesWrappers } from '../../../types/Initial/Wrapper';
import normalizeCustom from './normalizeCustom';
import normalizeNumber from '../normalizeNumber/normalizeNumber';
import normalizeString from '../normalizeString/normalizeString';
import { Context } from '../../../context/context';

export const normalizeValueForUser = (
	value: InitialExtendValue | QueryValue | undefined,
	initialValue: InitialExtendValue
) => {
	if (value === undefined) return initialValue.initial;
	switch (initialValue.type) {
		case 'boolean':
			return normalizeBoolean(value as string, initialValue);
		case 'number':
			return normalizeNumber(value as string, initialValue);
		case 'array':
			return normalizeArray(value as string[] | string, initialValue);
		case 'json':
			return normalizeJson(value as string, initialValue);
		case 'custom':
			return normalizeCustom(value, initialValue);
		case 'string':
			return normalizeString(value as string, initialValue);
		default:
			return value;
	}
};

export const normalizeForUser = (
	values: InitialExtendValues | QueryValues,
	context: Context,
	initialValuesWrappers: InitialExtendValuesWrappers = getInitialValuesWrappers(
		context
	)
): UserValues => {
	const normalized: UserValues = {};
	Object.keys(values).forEach((key) => {
		const value = values[key];
		const initialValueWrapper = initialValuesWrappers[key];
		const initialValue = initialValueWrapper.initialValue;
		switch (initialValue.type) {
			case 'boolean':
				normalized[key] = normalizeBoolean(
					value as string,
					initialValue
				);
				break;
			case 'number':
				normalized[key] = normalizeNumber(
					value as string,
					initialValue
				);
				break;
			case 'array':
				normalized[key] = normalizeArray(
					value as string[] | string,
					initialValue
				);
				break;
			case 'json':
				normalized[key] = normalizeJson(value as string, initialValue);
				break;
			case 'custom':
				normalized[key] = normalizeCustom(value, initialValue);
				break;
			case 'string':
				normalized[key] = normalizeString(
					value as string,
					initialValue
				);
				break;
			default:
				normalized[key] = value;
				break;
		}
	});
	return normalized;
};

export const normalizeForUserByInitialValues = (
	values: InitialExtendValues | QueryValues,
	initialValues: InitialExtendValues,
	context: Context
) => {
	const initialValuesWrappers = getInitialValuesWrappers(context);
	const resultsWrappers: InitialExtendValuesWrappers = {};

	Object.keys(initialValuesWrappers).forEach((key) => {
		if (initialValues[key] !== undefined) {
			resultsWrappers[key] = initialValuesWrappers[key];
		}
	});
	return normalizeForUser(values, context, resultsWrappers);
};
