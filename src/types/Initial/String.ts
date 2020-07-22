import { _InitialExtendObject } from './Initial';

export interface InitialExtendObjectString extends _InitialExtendObject {
	type: 'string';
	initial: string;
	enum?: [string];
	onParsedEnumError?: (value: string) => string;
}
