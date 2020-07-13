import { _InitialExtendObject } from './Initial';

export interface InitialExtendObjectBoolean extends _InitialExtendObject {
	type: 'boolean';
	initial: boolean;
	onParsedError?: (errorValue: string) => boolean;
}
