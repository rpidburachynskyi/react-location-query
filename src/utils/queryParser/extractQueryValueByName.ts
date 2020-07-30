import { QueryValue } from '../../types/Query';
import readQuery from './readQuery';
import { getInitialValueByFieldName } from '../valuesController/valuesController/valuesController';

const extractQueryValueByName = (name: string): QueryValue => {
	const queryField = readQuery()[name];
	const initialValue = getInitialValueByFieldName(name);

	if (queryField === undefined) return initialValue;

	return queryField;
};

export default extractQueryValueByName;
