import { InitialObject } from './Initial';

export interface ObjectJson extends InitialObject {
	type: 'json';
	initial: NonNullable<string | number | boolean | object>;
	onParsedError?: (
		errorValue: string
	) => NonNullable<string | number | boolean | object>;
}
