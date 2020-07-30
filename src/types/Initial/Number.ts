import { InitialObject } from './Initial';

export interface ObjectNumber extends InitialObject {
	type: 'number';
	initial: number;
	onParsedError?: (errorValue: string) => number;
}
