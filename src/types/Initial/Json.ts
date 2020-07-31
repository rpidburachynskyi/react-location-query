import { InitialObject } from './Initial';

export interface ObjectJson extends InitialObject {
	type: 'json';
	initial: NonNullable<string | number | boolean | object>;
	onParsedError?: (
		errorValue: string
	) => NonNullable<string | number | boolean | object>;
	validate?: (
		value: NonNullable<string | number | boolean | object>
	) => NonNullable<string | number | boolean | object>;
}
