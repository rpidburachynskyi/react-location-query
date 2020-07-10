import { InitialValues } from './types';
import useLocationQueryExtend from '../useLocationQueryExtend';

const useLocationQuery = (initialValues: InitialValues = {}) => {
	return useLocationQueryExtend(initialValues as any);
};

export default useLocationQuery;
