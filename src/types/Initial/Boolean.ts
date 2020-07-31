import { InitialObject } from './Initial';

export interface ObjectBoolean extends InitialObject {
	type: 'boolean';
	initial: boolean;
	onParsedError?: (errorValue: string) => boolean;
	validate?: (value: boolean) => boolean;
}
