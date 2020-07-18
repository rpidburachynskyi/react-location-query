import { getInitialValues } from '../valuesController/valuesController';
import { QueryValue, QueryValues } from '../../types/Query';
import {
	InitialExtendValue,
	InitialExtendValues
} from '../../types/Initial/Initial';
import { getOptions } from '../../stores/options/options';
import { InitialExtendObjectString } from '../../types/Initial/String';
import { InitialExtendObjectNumber } from '../../types/Initial/Number';
import { InitialExtendObjectJson } from '../../types/Initial/Json';

const normalizeForLocation = (
	queryValues: QueryValues | InitialExtendValues
) => {
	const initialValues = getInitialValues();

	let locationValues: QueryValues = {};

	Object.keys(initialValues).forEach((key) => {
		const value = queryValues[key];
		const initialValue = initialValues[key];
		switch (initialValue.type) {
			case 'json':
				locationValues[key] = normalizeJson(
					value as QueryValue | InitialExtendObjectJson
				);
				break;
			case 'number':
				locationValues[key] = normalizeNumber(
					value as QueryValue | InitialExtendObjectNumber
				);
				break;
			case 'boolean':
			case 'string':
			default:
				locationValues[key] = normalizeString(
					value as QueryValue | InitialExtendObjectString
				);
				break;
		}
	});

	removeUnusedQueryFields(queryValues, locationValues);
	locationValues = removeInitialValues(locationValues);
	return locationValues;
};

const removeInitialValues = (query: QueryValues) => {
	const initialValues = getInitialValues();
	const locationQuery = { ...query };
	Object.keys(query).forEach((key) => {
		const value = query[key];
		const initialValue = initialValues[key];
		if (!initialValue) return;
		if (initialValue.hideIfInitial) {
			if (
				(typeof value === 'object' && !Array.isArray(value)) ||
				compareValues(value, initialValue)
			) {
				delete locationQuery[key];
			}
		}
	});

	return locationQuery;
};

const removeUnusedQueryFields = (
	queryValues: QueryValues | InitialExtendValues,
	locationValues: QueryValues
) => {
	if (!getOptions().removeUnusedQueryFields) {
		Object.assign(locationValues, { ...queryValues, ...locationValues });
	}
};

const compareValues = (value: QueryValue, initialValue: InitialExtendValue) => {
	switch (initialValue.type) {
		case 'boolean':
			return (
				initialValue.initial === (value === 'true' || value === true)
			);
		case 'number':
			return +initialValue.initial === (+value as number);
		case 'json':
			return JSON.stringify(initialValue.initial) === value;
		case 'string':
		default:
			return initialValue.initial === value;
	}
};

const normalizeString = (
	value: QueryValue | InitialExtendObjectString
): string => {
	if (typeof value === 'object' && 'type' in value) return value.initial;
	return value as string;
};

const normalizeNumber = (
	value: QueryValue | InitialExtendObjectNumber
): string => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial.toString();

	return value as string;
};

const normalizeJson = (value: QueryValue | InitialExtendObjectJson): string => {
	if (typeof value === 'object' && 'type' in value)
		return JSON.stringify(value.initial);
	if (typeof value === 'object') return JSON.stringify(value);
	return value as string;
};

export default normalizeForLocation;
