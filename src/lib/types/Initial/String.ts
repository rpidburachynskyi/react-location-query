import { InitialObject } from './Initial';

export interface InitialObjectString extends InitialObject {
	type: 'string';
	initial: string;
	enum?: string[];
	onParsedEnumError?: (value: string) => string;
	validate?: (value: string) => string;
}

export interface InitialObjectStringWithEnum extends InitialObjectString {
	enum: string[];
	onParsedEnumError?: (value: string) => string;
}

export type ObjectString = InitialObjectString | InitialObjectStringWithEnum;
