export type _InitialObject = {
	hideIfInitial?: boolean;
};

export interface InitialObjectString extends _InitialObject {
	type: 'string';
	initial: string;
}

export interface InitialObjectBoolean extends _InitialObject {
	type: 'boolean';
	initial: boolean;
}

export interface InitialObjectNumber extends _InitialObject {
	type: 'number';
	initial: number;
}

export interface _InitialObjectArray extends _InitialObject {
	type: 'array';
	arrayType: 'string' | 'boolean' | 'number';
	initial: Array<any>;
}

export interface InitialObjectArrayString extends _InitialObjectArray {
	arrayType: 'string';
	initial: Array<string>;
}

export interface InitialObjectArrayNumber extends _InitialObjectArray {
	arrayType: 'number';
	initial: Array<number>;
}

export interface InitialObjectArrayBoolean extends _InitialObjectArray {
	arrayType: 'boolean';
	initial: Array<boolean>;
}

export type InitialObjectArray =
	| InitialObjectArrayString
	| InitialObjectArrayNumber
	| InitialObjectArrayBoolean;

export type InitialObject =
	| InitialObjectString
	| InitialObjectBoolean
	| InitialObjectNumber
	| InitialObjectArray;

export type InitialValue =
	| string
	| boolean
	| number
	| Array<string | boolean | number>;

export type InitialField = InitialValue | InitialObject;

export interface InitialValues {
	[path: string]: InitialField;
}

export interface InitialValuesWrapper {
	initialValues: InitialValues;
	index: number;
}
