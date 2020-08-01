import decryptQuery from '../crypto/decryptQuery';
import qs from 'querystring';
import { QueryValues } from '../../types/Query';
import { getLocation } from '../../stores/store/store';
import { Location } from '../../types/HistoryLocation';
import CryptoOptions from '../../stores/options/types/CryptoOptions/CryptoOptions';

const readQuery = (crypto: CryptoOptions): QueryValues => {
	const location: Location = getLocation();
	return parseQuery(location.search, crypto);
};

export default readQuery;

const parseQuery = (query: string, crypto: CryptoOptions): QueryValues => {
	try {
		const q = qs.parse(query === '' ? '' : query.substring(1));
		if (crypto.method !== 'none') {
			if (q.q as any) return decryptQuery(q.q as any, crypto);
			return {};
		}
		return q;
	} catch (e) {
		return {};
	}
};
