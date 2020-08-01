import { InitialObject } from './Initial';

export interface ObjectCustom extends InitialObject {
	type: 'custom';
	initial: any;

	validateFromLocation?: (value: string) => any;

	fromString: (value: string) => any;

	toString: (value: any) => string;

	onParsedError?: (errorValue: any) => number;
}
