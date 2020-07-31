import { ObjectArray } from './Array';
import { ObjectBoolean } from './Boolean';
import { ObjectJson } from './Json';
import { ObjectNumber } from './Number';
import { ObjectString } from './String';
import { ObjectCustom } from './Custom';
import { ActionOnChange } from '../ActionOnChange';

export type InitialObject = {
	hideIfInitial?: boolean;
	replaceValueWhenParsedError?: boolean;
	actionOnChange?: ActionOnChange;
};

export type InitialObjectType =
	| ObjectString
	| ObjectBoolean
	| ObjectNumber
	| ObjectArray
	| ObjectJson
	| ObjectCustom;

export type InitialExtendValue = InitialObjectType;

export interface InitialExtendValues {
	[path: string]: InitialExtendValue;
}
