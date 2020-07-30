import { QueryValues } from '../../types/Query';
import { getLocation } from '../../stores/store/store';
import { getOptions } from '../../stores/options/options';
import decryptQuery from '../crypto/decryptQuery';
import { Location } from '../../types/HistoryLocation';
import qs from 'querystring';

const readQuery = (): QueryValues => {
	const location: Location = getLocation();
	return parseQuery(location.search);
};

export default readQuery;

const parseQuery = (query: string): QueryValues => {
	try {
		const q = qs.parse(query === '' ? '' : query.substring(1));
		if (getOptions().crypto) {
			if (q.q as any) return decryptQuery(q.q as any);
			return {};
		}
		return q;
	} catch (e) {
		return {};
	}
};
