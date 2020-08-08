import { InitialObject } from './Initial';

interface InitialObjectNumber extends InitialObject {
	type: 'number';
	initial: number;
	onParsedError?: (errorValue: string) => number;
	validate?: (value: number) => number;

	integer?: boolean;
	onParsedIntegerError?: (number: number) => number;

	min?: number;
	max?: number;
}

interface InitialObjectNumberWithEnum extends InitialObjectNumber {
	enum: number[];
	onParsedEnumError?: (value: number) => number;
}

export type ObjectNumber = InitialObjectNumber | InitialObjectNumberWithEnum;
