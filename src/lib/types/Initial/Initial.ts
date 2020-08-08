import { ObjectArray } from './Array';
import { ObjectBoolean } from './Boolean';
import { ObjectJson } from './Json';
import { ObjectNumber } from './Number/Number';
import { ObjectString } from './String';
import { ObjectCustom } from './Custom';

export type InitialObject = {
	hideIfInitial?: boolean;
	replaceValueWhenParsedError?: boolean;
	actionOnChange?: 'Push' | 'Replace';
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
