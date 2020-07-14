import useLocationQueryExtend from '../useLocationQueryExtend';
import { InitialValues } from './types';

const useLocationQuery = (initialValues: InitialValues = {}) => {
	return useLocationQueryExtend(initialValues);
};

export default useLocationQuery;
