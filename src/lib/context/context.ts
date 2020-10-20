import { createContext } from 'react';
import { InitialExtendValuesWrappers } from '../types/Initial/Wrapper';
import { SortOptions } from '../stores/options/types/SortOptions';
import { DefaultOptions } from '../stores/options/types/DefaultOptions';
import CryptoOptions from '../stores/options/types/CryptoOptions/CryptoOptions';
import { Rules } from '../stores/options/types/Rules';

export interface Context {
	query: object;
	initialValuesWrappers: InitialExtendValuesWrappers;

	sortOptions: SortOptions;
	defaultOptions: DefaultOptions;
	cryptoOptions: CryptoOptions;
	rules: Rules;
}

const Context = createContext<Context>(undefined as any);

export default Context;
