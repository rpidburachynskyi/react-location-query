import {
	InitialExtendObjectArrayBoolean,
	InitialExtendObjectArrayNumber,
	InitialExtendObjectArrayString
} from '../../types/Initial/Array';
import { InitialExtendObjectBoolean } from '../../types/Initial/Boolean';
import { InitialExtendObjectJson } from '../../types/Initial/Json';
import { InitialExtendObjectNumber } from '../../types/Initial/Number';
import { InitialExtendObjectString } from '../../types/Initial/String';
import useLocationQueryExtend from '../useLocationQueryExtend';

function useLocationField(
	name: string,
	value: InitialExtendObjectString | string
): [string, (value: string) => void];

function useLocationField(
	name: string,
	value?: InitialExtendObjectNumber | number
): [number, (value: number) => void];

function useLocationField(
	name: string,
	value?: InitialExtendObjectBoolean | boolean
): [boolean, (value: boolean) => void];

function useLocationField(
	name: string,
	value?: InitialExtendObjectJson
): [object, (value: object) => void];

function useLocationField(
	name: string,
	value?: InitialExtendObjectArrayBoolean
): [boolean[], (value: boolean[]) => void];

function useLocationField(
	name: string,
	value?: InitialExtendObjectArrayNumber
): [number[], (value: number[]) => void];

function useLocationField(
	name: string,
	value?: InitialExtendObjectArrayString
): [string[], (value: string[]) => void];

function useLocationField(name: string, value?: any) {
	const { fullQuery, setQueryField } = useLocationQueryExtend(
		value !== undefined ? { [name]: value } : {}
	);

	return [
		fullQuery[name],
		(value: any) => {
			setQueryField(name, value);
		}
	] as any;
}

export default useLocationField;
