import { InitialExtendValue } from './Initial';

export interface InitialExtendValueWrapper<T> {
	index: number;
	name: string;
	initialValue: T;
}

export interface InitialExtendValuesWrappers {
	[name: string]: InitialExtendValueWrapper<InitialExtendValue>;
}
