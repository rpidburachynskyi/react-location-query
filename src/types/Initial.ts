export type _InitialExtendObject = {
	hideIfInitial?: boolean;
	replaceValueWhenParsedError: boolean;
};

export interface InitialExtendObjectString extends _InitialExtendObject {
	type: 'string';
	initial: string;
}

export interface InitialExtendObjectBoolean extends _InitialExtendObject {
	type: 'boolean';
	initial: boolean;
	onParsedError?: (errorValue: string) => boolean;
}

export interface InitialExtendObjectNumber extends _InitialExtendObject {
	type: 'number';
	initial: number;
	onParsedError?: (errorValue: string) => number;
}

export interface _InitialExtendObjectArray extends _InitialExtendObject {
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
}

export interface InitialExtendObjectArrayBoolean
	extends _InitialExtendObjectArray {
	arrayType: 'boolean';
	initial: Array<boolean>;
	onParsedError?: (errorValues: string[]) => Array<boolean>;
}

export type InitialExtendObjectArray =
	| InitialExtendObjectArrayString
	| InitialExtendObjectArrayNumber
	| InitialExtendObjectArrayBoolean;

export interface InitialExtendObjectJson extends _InitialExtendObject {
	type: 'json';
	initial: NonNullable<string | number | boolean | object>;
	onParsedError?: (errorValue: string) => string;
}

export type InitialExtendObject =
	| InitialExtendObjectString
	| InitialExtendObjectBoolean
	| InitialExtendObjectNumber
	| InitialExtendObjectArray
	| InitialExtendObjectJson;

export type InitialExtendValue =
	| string
	| boolean
	| number
	| Array<string | boolean | number>;

export type InitialExtendField = InitialExtendObject;

export interface InitialExtendValues {
	[path: string]: InitialExtendField;
}

export interface InitialExtendValuesWrapper {
	initialValues: InitialExtendValues;
	index: number;
}
