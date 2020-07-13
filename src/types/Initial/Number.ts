import { _InitialExtendObject } from './Initial';

export interface InitialExtendObjectNumber extends _InitialExtendObject {
	type: 'number';
	initial: number;
	onParsedError?: (errorValue: string) => number;
}
