import {
	InitialExtendObjectArrayBoolean,
	InitialExtendObjectArrayNumber,
	InitialExtendObjectArrayString
} from '../../types/Initial/Array';
import { InitialExtendObjectBoolean } from '../../types/Initial/Boolean';
import { InitialExtendObjectJson } from '../../types/Initial/Json';
import { InitialExtendObjectNumber } from '../../types/Initial/Number';
import { InitialExtendObjectString } from '../../types/Initial/String';
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
	value?: InitialExtendObjectString | string
): [string, (value: string) => void];

function useLocationField(
	name: string,
	value: InitialExtendObjectNumber
): [number, (value: number) => void];

function useLocationField(
	name: string,
	value: InitialExtendObjectBoolean | boolean
): [boolean, (value: boolean) => void];

function useLocationField(
	name: string,
	value: InitialExtendObjectJson
): [any, (value: any) => void];

function useLocationField(
	name: string,
	value: InitialExtendObjectArrayBoolean
): [boolean[], (value: boolean[]) => void];

function useLocationField(
	name: string,
	value: InitialExtendObjectArrayNumber
): [number[], (value: number[]) => void];

function useLocationField(
	name: string,
	value: InitialExtendObjectArrayString
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
