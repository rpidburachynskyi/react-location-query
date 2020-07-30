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
import { setHistory } from '../../stores/store/store';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
	calculateLocationPath,
	setQueryField
} from '../../utils/locationController/locationController';
import {
	addInitialValues,
	removeInitialValues
} from '../../utils/valuesController/valuesController';
import { hashFromObject } from '../../utils/objects';
import { extractQueryValueByName } from '../../utils/queryParser/queryParser';
import { normalizeForUser } from '../../utils/normalizer/normalizer';

function useLocationField(
	name: string,
	value?: ObjectString | string
): [string, (value: string) => void];

function useLocationField(
	name: string,
	value: ObjectNumber
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

	const index = useIndex(); // index for save order

	setHistory(useHistory());
	const location = useLocation(); // NO DELETE, using for rerender when change location
	useEffect(() => {
		calculateLocationPath();
	}, [location.search]);

	addInitialValues(initialValues, index);

	useEffect(() => {
		setTimeout(() => {
			calculateLocationPath();
		}, 0);
		addInitialValues(initialValues, index);
		return () => {
			removeInitialValues(initialValues);
			setTimeout(() => {
				calculateLocationPath();
			}, 0);
		};
	}, [hashFromObject(initialValues)]);

	return [
		normalizeForUser(extractQueryValueByName(name))[name],
		(a: any) => setQueryField(name, a)
	];
}

export default useLocationField;
