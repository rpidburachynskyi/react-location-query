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
import {
	calculateLocationPath,
	setQueryField
} from '../../utils/locationController/locationController';
import {
	addInitialValues,
	removeInitialValues
} from '../../utils/valuesController/valuesController';
import { hashFromObject } from '../../utils/objects';
import { normalizeForUser } from '../../utils/normalizer/normalizer';
import extractQueryValueByName from '../../utils/queryParser/extractQueryValueByName';
import Context from '../../context/context';

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
	const initialValues = value !== undefined ? { [name]: value } : {};

	const index = useIndex();
	const contect = useContext(Context);
	console.log(contect);
	addInitialValues(initialValues, index);

	useEffect(() => {
		calculateLocationPath();
		return () => {
			removeInitialValues(initialValues);
			calculateLocationPath();
		};
	}, [hashFromObject(initialValues)]);

	return [
		normalizeForUser({ [name]: extractQueryValueByName(name) })[name],
		(a: any) => setQueryField(name, a)
	];
}

export default useLocationField;
