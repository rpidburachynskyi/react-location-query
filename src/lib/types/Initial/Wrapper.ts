import { InitialExtendValue } from './Initial';

export interface InitialExtendValueWrapper<T> {
	index: number;
	name: string;
	storedValue: any;
	initialValue: T;
}

export interface InitialExtendValuesWrappers {
	[name: string]: InitialExtendValueWrapper<InitialExtendValue>;
}
