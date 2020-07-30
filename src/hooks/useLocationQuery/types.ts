import { ObjectBoolean } from '../../types/Initial/Boolean';
import { ObjectString } from '../../types/Initial/String';
import { ObjectNumber } from '../../types/Initial/Number';
import { ObjectArray } from '../../types/Initial/Array';

export type InitialValue =
	| ObjectBoolean
	| ObjectString
	| ObjectNumber
	| ObjectArray;

export interface InitialValues {
	[path: string]: InitialValue;
}
