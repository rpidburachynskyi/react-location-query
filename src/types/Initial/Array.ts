import { _InitialExtendObject } from './Initial';

interface _InitialExtendObjectArray extends _InitialExtendObject {
	type: 'array';
	arrayType: 'string' | 'boolean' | 'number';
	initial: Array<any>;
}

export interface InitialExtendObjectArrayString
	extends _InitialExtendObjectArray {
	arrayType: 'string';
	initial: Array<string>;
	onParsedError?: (errorValues: string[]) => Array<string>;
}

export interface InitialExtendObjectArrayNumber
	extends _InitialExtendObjectArray {
	arrayType: 'number';
	initial: Array<number>;
	onParsedError?: (errorValues: string[]) => Array<number>;
	onParsedItemError?: (errorValue: string) => number;
}

export interface InitialExtendObjectArrayBoolean
	extends _InitialExtendObjectArray {
	arrayType: 'boolean';
	initial: Array<boolean>;
	onParsedError?: (errorValues: string[]) => Array<boolean>;
	onParsedItemError?: (errorValue: string) => boolean;
}

export type InitialExtendObjectArray =
	| InitialExtendObjectArrayString
	| InitialExtendObjectArrayNumber
	| InitialExtendObjectArrayBoolean;
