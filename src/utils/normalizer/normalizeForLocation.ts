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
import { InitialExtendObjectBoolean } from '../../types/Initial/Boolean';

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
				locationValues[key] = normalizeJson(value);
				break;
			case 'number':
				locationValues[key] = normalizeNumber(value);
				break;
			case 'boolean':
				locationValues[key] = normalizeBoolean(value);
				break;
			case 'string':
				locationValues[key] = normalizeString(value);
				break;
			default:
				throw new Error('Unknown behavior error: unknown value');
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
	value: string | QueryValue | InitialExtendObjectString
): string => {
	console.log(value);

	if (typeof value === 'object' && 'type' in value) return value.initial;

	if (typeof value === 'string') return value;

	throw new Error('Unknown behavior error: Value is not an string');
};

const normalizeNumber = (
	value: string | QueryValue | InitialExtendObjectNumber
): string => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial.toString();
	if (typeof value === 'string') return value;

	if (typeof value === 'number') {
		if (isNaN(value)) return '0';
		return value.toString();
	}

	throw new Error('Unknown behavior error: Value is not an number');
};

const normalizeBoolean = (
	value: string | QueryValue | InitialExtendObjectBoolean
): string => {
	if (typeof value === 'object' && 'type' in value)
		return value.initial ? 'true' : 'false';

	if (typeof value === 'string')
		if (value === 'true' || value === 'false') return value;

	if (typeof value === 'boolean') return value ? 'true' : 'false';

	throw new Error('Unknown behavior error: Value is not an boolean');
};

const normalizeJson = (
	value: string | QueryValue | InitialExtendObjectJson
): string => {
	if (typeof value !== 'object')
		throw new Error('Unknown behavior error: Value is not an object');

	if (typeof value === 'object' && 'type' in value)
		return JSON.stringify(value.initial);

	if (typeof value === 'object') return JSON.stringify(value);
	return value;
};

export default normalizeForLocation;
