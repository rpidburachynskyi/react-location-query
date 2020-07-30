import { InitialObject } from './Initial';

export interface ObjectString extends InitialObject {
	type: 'string';
	initial: string;
	enum?: string[];
	onParsedEnumError?: (value: string) => string;
}
