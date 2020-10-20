import { ObjectArray } from './Array';
import { ObjectBoolean } from './Boolean';
import { ObjectJson } from './Json';
import ObjectNumber from './Number/Number';
import ObjectString from './String/String';

export type InitialObject = {
	hideIfInitial?: boolean;
	replaceValueWhenParsedError?: boolean;
	actionOnChange?: 'Push' | 'Replace';
	active?:
		| boolean
		| {
				storeValue: boolean;
				changeValue: boolean;
				isActive: boolean;
		  };
};

export type InitialObjectType =
	| ObjectString
	| ObjectBoolean
	| ObjectNumber
	| ObjectArray
	| ObjectJson;

export type InitialExtendValue = InitialObjectType;

export interface InitialExtendValues {
	[path: string]: InitialExtendValue;
}
