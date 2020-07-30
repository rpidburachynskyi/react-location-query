import {
	InitialExtendValues,
	InitialExtendValueWrapper,
	InitialExtendValuesWrappers
} from '../../../types/Initial/Initial';
import { UserValues } from '../../../types/User';
import { getInitialValuesWrappers } from '../../valuesController/valuesController';
import { InitialExtendObjectJson } from '../../../types/Initial/Json';
import { InitialExtendObjectString } from '../../../types/Initial/String';
import normalizeBoolean from './normalizeBoolean';
import normalizeNumber from './normalizeNumber';
import normalizeJson from './normalizeJson';
import normalizeString from './normalizeString';
import normalizeArray from './normalizeArray';
import { QueryValues } from '../../../types/Query';

export const normalizeForUser = (
	values: InitialExtendValues | QueryValues,
	initialValuesWrappers: InitialExtendValuesWrappers = getInitialValuesWrappers()
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
				normalized[key] = normalizeJson(
					value as string,
					initialValueWrapper as InitialExtendValueWrapper<
						InitialExtendObjectJson
					>
				);
				break;
			case 'string':
				normalized[key] = normalizeString(
					value as string,
					initialValueWrapper as InitialExtendValueWrapper<
						InitialExtendObjectString
					>
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
	initialValues: InitialExtendValues
) => {
	const initialValuesWrappers = getInitialValuesWrappers();
	const resultsWrappers: InitialExtendValuesWrappers = {};

	Object.keys(initialValuesWrappers).forEach((key) => {
		if (initialValues[key] !== undefined) {
			resultsWrappers[key] = initialValuesWrappers[key];
		}
	});
	return normalizeForUser(values, resultsWrappers);
};
