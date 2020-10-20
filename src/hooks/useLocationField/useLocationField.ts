import {
	ObjectArrayBoolean,
	ObjectArrayNumber,
	ObjectArrayString
} from '../../lib/types/Initial/Array';
import { ObjectBoolean } from '../../lib/types/Initial/Boolean';
import { ObjectJson } from '../../lib/types/Initial/Json';
import ObjectNumber from '../../lib/types/Initial/Number/Number';
import ObjectString from '../../lib/types/Initial/String/String';
import useIndex from '../useIndex';
import { useContext } from 'react';
import { setQueryFieldValue } from '../../lib/utils/locationController/locationController';
import { getInitialValueByFieldName } from '../../lib/utils/valuesController/valuesController/valuesController';
import { normalizeValueForUser } from '../../lib/utils/normalizer/normalizeForUser/normalizeForUser';
import { addInitialValue } from '../../lib/utils/valuesController/valuesController/addInitialValues';
import transformToInitialValue from '../../lib/utils/valuesController/valuesController/transformInitialValues';
import { InitialObjectType } from '../../lib/types/Initial/Initial';
import { ActionOnChange } from '../../lib/types/ActionOnChange';
import Context from '../../lib/context/context';

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

	if (!context)
		throw new Error(
			'You must use useLocationField hook inside BrowserLocationQuery'
		);

	if (value !== undefined) {
		const initialValue: InitialObjectType = transformToInitialValue(
			value,
			context
		);

		addInitialValue(name, initialValue, index, context);
		context.query[name] = normalizeValueForUser(
			context.query[name],
			initialValue,
			name,
			context
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
