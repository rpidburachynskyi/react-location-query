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
import { useEffect, useContext } from 'react';
import { setQueryFieldValue } from '../../utils/locationController/locationController';
import {} from '../../utils/valuesController/valuesController/valuesController';
import { hashFromObject } from '../../utils/objects';
import Context from '../../context/context';
import { normalizeValueForUser } from '../../utils/normalizer/normalizeForUser/normalizeForUser';
import { addInitialValue } from '../../utils/valuesController/valuesController/addInitialValues';
import { removeInitialValue } from '../../utils/valuesController/valuesController/removeInitialValues';

function useLocationField(
	name: string,
	value?: ObjectString | string
): [string, (value: string) => void];

function useLocationField(
	name: string,
	value: ObjectNumber | number
): [number, (value: number) => void];

function useLocationField(
	name: string,
	value: ObjectBoolean | boolean
): [boolean, (value: boolean) => void];

function useLocationField(
	name: string,
	value: ObjectJson
): [any, (value: any) => void];

function useLocationField(
	name: string,
	value: ObjectArrayBoolean
): [boolean[], (value: boolean[]) => void];

function useLocationField(
	name: string,
	value: ObjectArrayNumber
): [number[], (value: number[]) => void];

function useLocationField(
	name: string,
	value: ObjectArrayString
): [string[], (value: string[]) => void];

function useLocationField<T>(name: string): [any, (value: any) => void];
function useLocationField(name: string): [any, (value: any) => void];

function useLocationField(name: string, value?: any) {
	const index = useIndex();
	const context = useContext(Context);
	const initialValue = addInitialValue(name, value, index, context);
	useEffect(() => {
		if (!initialValue) return;
		return () => {
			removeInitialValue(name, initialValue, context);
		};
	}, [hashFromObject(initialValue)]);

	if (initialValue !== undefined) {
		context.query[name] = normalizeValueForUser(
			context.query[name],
			initialValue
		);
	}

	return [
		context.query[name],
		(newValue: any) => setQueryFieldValue(name, newValue, context)
	];
}

export default useLocationField;
