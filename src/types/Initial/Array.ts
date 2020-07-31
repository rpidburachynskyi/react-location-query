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
	validate?: (array: Array<string>) => Array<string>;
}

export interface ObjectArrayNumber extends InitialObjectArray {
	arrayType: 'number';
	initial: Array<number>;
	onParsedError?: (errorValues: string[]) => Array<number>;
	onParsedItemError?: (errorValue: string) => number;
	validate?: (array: Array<number>) => Array<number>;
}

export interface ObjectArrayBoolean extends InitialObjectArray {
	arrayType: 'boolean';
	initial: Array<boolean>;
	onParsedError?: (errorValues: string[]) => Array<boolean>;
	onParsedItemError?: (errorValue: string) => boolean;
	validate?: (array: Array<number>) => Array<number>;
}

export type ObjectArray =
	| ObjectArrayString
	| ObjectArrayNumber
	| ObjectArrayBoolean;
