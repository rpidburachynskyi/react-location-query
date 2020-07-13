import { InitialExtendObjectBoolean } from '../types/Initial/Boolean';
import { InitialExtendObjectString } from '../types/Initial/String';
import { InitialExtendObjectNumber } from '../types/Initial/Number';
import { InitialExtendObjectArray } from '../types/Initial/Array';

export type InitialValue =
	| InitialExtendObjectBoolean
	| InitialExtendObjectString
	| InitialExtendObjectNumber
	| InitialExtendObjectArray;

export interface InitialValues {
	[path: string]: InitialValue;
}
