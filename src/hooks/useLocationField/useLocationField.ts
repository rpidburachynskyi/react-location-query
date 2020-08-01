import {
	ObjectArrayBoolean,
	ObjectArrayNumber,
	ObjectArrayString
} from '../../types/Initial/Array';
import { ObjectBoolean } from '../../types/Initial/Boolean';
import { ObjectJson } from '../../types/Initial/Json';
import { ObjectNumber } from '../../types/Initial/Number';
import { ObjectString } from '../../types/Initial/String';
import useIndex from '../useIndex';
import { useContext } from 'react';
import { setQueryFieldValue } from '../../utils/locationController/locationController';
import { getInitialValueByFieldName } from '../../utils/valuesController/valuesController/valuesController';
import Context from '../../context/context';
import { normalizeValueForUser } from '../../utils/normalizer/normalizeForUser/normalizeForUser';
import { addInitialValue } from '../../utils/valuesController/valuesController/addInitialValues';
import transformToInitialValue from '../../utils/valuesController/valuesController/transformInitialValues';
import { InitialObjectType } from '../../types/Initial/Initial';
import { ActionOnChange } from '../../types/ActionOnChange';

function useLocationField(
	name: string,
	value: ObjectString | string
): [string, (value: string, actionOnChange?: ActionOnChange) => void];

function useLocationField(
	name: string,
	value: ObjectNumber | number
): [number, (value: number, actionOnChange?: ActionOnChange) => void];

function useLocationField(
	name: string,
	value: ObjectBoolean | boolean
): [boolean, (value: boolean, actionOnChange?: ActionOnChange) => void];

function useLocationField(
	name: string,
	value: ObjectJson
): [any, (value: any, actionOnChange?: ActionOnChange) => void];

function useLocationField(
	name: string,
	value: ObjectArrayBoolean | boolean[]
): [boolean[], (value: boolean[], actionOnChange?: ActionOnChange) => void];

function useLocationField(
	name: string,
	value: ObjectArrayNumber | number[]
): [number[], (value: number[], actionOnChange?: ActionOnChange) => void];

function useLocationField(
	name: string,
	value: ObjectArrayString | string[]
): [string[], (value: string[], actionOnChange?: ActionOnChange) => void];

function useLocationField(
	name: string
): [any, (value: any, actionOnChange?: ActionOnChange) => void];

function useLocationField(name: string, value?: any) {
	const index = useIndex();
	const context = useContext(Context);

	if (value !== undefined) {
		const initialValue: InitialObjectType = transformToInitialValue(
			value,
			context
		);

		addInitialValue(name, initialValue, index, context);
		context.query[name] = normalizeValueForUser(
			context.query[name],
			initialValue
		);
	}

	if (context.query[name] === undefined && value === undefined)
		throw new Error(`Unknown field: '${name}'`);

	const initial = getInitialValueByFieldName(name, context);

	return [
		context.query[name],
		(
			newValue: any,
			actionOnChange: 'Push' | 'Replace' = initial.actionOnChange
				? initial.actionOnChange
				: 'Replace'
		) => setQueryFieldValue(name, newValue, context, actionOnChange)
	];
}

export default useLocationField;
