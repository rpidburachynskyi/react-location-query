import { InitialExtendValue } from './Initial';

export interface InitialExtendValueWrapper<T> {
	index: number;
	name: string;
	storedValue: any;
	marked: boolean;
	initialValue: T;
}

export interface InitialExtendValuesWrappers {
	[name: string]: InitialExtendValueWrapper<InitialExtendValue>;
}
