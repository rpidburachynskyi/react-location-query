import { ObjectArray } from './Array';
import { ObjectBoolean } from './Boolean';
import { ObjectJson } from './Json';
import ObjectNumber from './Number/Number';
import ObjectString from './String/String';

type ActiveState =
	| boolean
	| {
			storeValue: true;
			canChangeValue: true;
			isActive: boolean;
	  }
	| {
			storeValue: true;
			canChangeValue: false;
			isActive: boolean;
	  }
	| {
			storeValue: false;
			canChangeValue: false;
			isActive: boolean;
	  };

export type InitialObject = {
	hideIfInitial?: boolean;
	replaceValueWhenParsedError?: boolean;
	actionOnChange?: 'Push' | 'Replace';
	active?: ActiveState;
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
