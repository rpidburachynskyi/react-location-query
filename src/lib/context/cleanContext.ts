import { Context } from './context';

export const cleanContext = (context: Context) => {
	context.isCleaned = true;
};
