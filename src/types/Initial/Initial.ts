import { InitialExtendObjectArray } from './Array';
import { InitialExtendObjectBoolean } from './Boolean';
import { InitialExtendObjectJson } from './Json';
import { InitialExtendObjectNumber } from './Number';
import { InitialExtendObjectString } from './String';

export type _InitialExtendObject = {
	hideIfInitial?: boolean;
	replaceValueWhenParsedError?: boolean;
};

export type InitialExtendObject =
	| InitialExtendObjectString
	| InitialExtendObjectBoolean
	| InitialExtendObjectNumber
	| InitialExtendObjectArray
	| InitialExtendObjectJson;

export type InitialExtendValue = InitialExtendObject;

export interface InitialExtendValues {
	[path: string]: InitialExtendValue;
}

export interface InitialExtendValueWrapper<T> {
	index: number;
	name: string;
	initialValue: T;
}

export interface InitialExtendValuesWrappers {
	[name: string]: InitialExtendValueWrapper<InitialExtendValue>;
}
