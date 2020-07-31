import { createContext } from 'react';
import { InitialExtendValuesWrappers } from '../types/Initial/Wrapper';

export interface Context {
	query: object;
	initialValuesWrappers: InitialExtendValuesWrappers[];
}

const InitialContextType: Context = {
	initialValuesWrappers: [],
	query: {}
};

const Context = createContext<Context>(InitialContextType);

export default Context;
