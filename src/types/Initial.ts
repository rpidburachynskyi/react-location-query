export type _InitialExtendObject = {
	hideIfInitial?: boolean;
};

export interface InitialExtendObjectString extends _InitialExtendObject {
	type: 'string';
	initial: string;
}

export interface InitialExtendObjectBoolean extends _InitialExtendObject {
	type: 'boolean';
	initial: boolean;
}

export interface InitialExtendObjectNumber extends _InitialExtendObject {
	type: 'number';
	initial: number;
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
}

export interface InitialExtendObjectArrayNumber
	extends _InitialExtendObjectArray {
	arrayType: 'number';
	initial: Array<number>;
}

export interface InitialExtendObjectArrayBoolean
	extends _InitialExtendObjectArray {
	arrayType: 'boolean';
	initial: Array<boolean>;
}

export type InitialExtendObjectArray =
	| InitialExtendObjectArrayString
	| InitialExtendObjectArrayNumber
	| InitialExtendObjectArrayBoolean;

export interface InitialExtendObjectJson extends _InitialExtendObject {
	type: 'json';
	initial: NonNullable<string | number | boolean | object>;
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
