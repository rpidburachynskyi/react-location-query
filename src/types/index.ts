import * as H from 'history';

export type Values = string | boolean | number;

export type DefaultValueField =
	| Values
	| {
			type: 'string' | 'boolean' | 'number';
			default?: Values;
			hideIfDefault?: boolean;
	  };

export interface DefaultValues {
	[path: string]: DefaultValueField;
}

export interface Options {
	sort: 'alphabet';
	sortOrder: 'asc' | 'desc';
}

export interface Location extends H.Location<H.History.PoorMansUnknown> {}
export interface History extends H.History<H.LocationState> {}
