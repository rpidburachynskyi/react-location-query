import { _InitialExtendObject } from './Initial';

export interface InitialExtendObjectJson extends _InitialExtendObject {
	type: 'json';
	initial: NonNullable<string | number | boolean | object>;
	onParsedError?: (errorValue: string) => string;
}
