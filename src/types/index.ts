import * as H from 'history';

export type InitialValuesFieldValue = string | boolean | number;

export type InitialValuesField =
	| InitialValuesFieldValue
	| {
			type: 'string' | 'boolean' | 'number';
			initial: InitialValuesFieldValue;
			hideIfDefault?: boolean;
	  };

export interface InitialValues {
	[path: string]: InitialValuesField;
}

export interface InitialValuesWrapper {
	initialValues: InitialValues;
	index: number;
}

export interface Options {
	sort: 'alphabet';
	sortOrder: 'asc' | 'desc';
}

export interface Location extends H.Location<H.History.PoorMansUnknown> {}
export interface History extends H.History<H.LocationState> {}
