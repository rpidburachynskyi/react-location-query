import { InitialObject } from './Initial';

interface InitialObjectArray extends InitialObject {
	type: 'array';
	arrayType: 'string' | 'boolean' | 'number';
	initial: Array<any>;
}

export interface ObjectArrayString extends InitialObjectArray {
	arrayType: 'string';
	initial: Array<string>;
	onParsedError?: (errorValues: string[]) => Array<string>;
}

export interface ObjectArrayNumber extends InitialObjectArray {
	arrayType: 'number';
	initial: Array<number>;
	onParsedError?: (errorValues: string[]) => Array<number>;
	onParsedItemError?: (errorValue: string) => number;
}

export interface ObjectArrayBoolean extends InitialObjectArray {
	arrayType: 'boolean';
	initial: Array<boolean>;
	onParsedError?: (errorValues: string[]) => Array<boolean>;
	onParsedItemError?: (errorValue: string) => boolean;
}

export type ObjectArray =
	| ObjectArrayString
	| ObjectArrayNumber
	| ObjectArrayBoolean;
