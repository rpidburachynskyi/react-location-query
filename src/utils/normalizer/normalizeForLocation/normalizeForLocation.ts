import { getInitialValues } from '../../valuesController/valuesController/valuesController';
import {
	InitialExtendValue,
	InitialExtendValues
} from '../../../types/Initial/Initial';
import { getOptions } from '../../../stores/options/options';
import { QueryValues, QueryValue } from '../../../types/Query';
import normalizeJson from './normalizeJson';
import normalizeArray from './normalizeArray';
import normalizeCustom from './normalizeCustom';
import normalizeBoolean from '../normalizeBoolean';
import normalizeNumber from '../normalizeNumber';
import normalizeString from '../normalizeString';
import { Context } from '../../../context/context';

const normalizeForLocation = (
	queryValues: QueryValues | InitialExtendValues,
	context: Context
) => {
	const initialValues = getInitialValues(context);
	let locationValues: QueryValues = {};
	Object.keys(initialValues).forEach((key) => {
		const value = queryValues[key] ? queryValues[key] : initialValues[key];
		const initialValue = initialValues[key];
		switch (initialValue.type) {
			case 'json':
				locationValues[key] = normalizeJson(value);
				break;
			case 'number':
				locationValues[key] = normalizeNumber(
					value as any,
					initialValue
				).toString();
				break;
			case 'boolean':
				locationValues[key] = normalizeBoolean(
					value as any,
					initialValue
				)
					? 'true'
					: 'false';
				break;
			case 'string':
				locationValues[key] = normalizeString(
					value as any,
					initialValue
				);
				break;
			case 'array':
				locationValues[key] = normalizeArray(value, initialValue);
				break;
			case 'custom':
				locationValues[key] = normalizeCustom(value, initialValue);
				break;
			default:
				throw new Error('Unknown behavior error: unknown value');
		}
	});
	removeUnusedQueryFields(queryValues, locationValues);
	locationValues = removeInitialValues(locationValues, context);
	return locationValues;
};

const removeInitialValues = (query: QueryValues, context: Context) => {
	const initialValues = getInitialValues(context);
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

export default normalizeForLocation;
