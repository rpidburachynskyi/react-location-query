import compressFromBase64 from './compres/base64/compressFromBase64';
import base64Decrypt from './methods/base64/base64Decrypt';
import xorDecrypt from './methods/xor/xorDecrypt';
import CryptoOption from '../../types/Options/CryptoOption';
import { Options } from '../../stores/options/types/Options';

const decryptQuery = (query: string, options: Options) => {
	const option = options.crypto as Exclude<CryptoOption, false>;

	let decrypted;

	switch (option.method) {
		case 'base64':
			decrypted = base64Decrypt(query);
			break;
		case 'xor':
			if (option.compessedToBase64)
				decrypted = xorDecrypt(compressFromBase64(query), option.key);
			else decrypted = xorDecrypt(query, option.key);
			break;
		default:
			throw new Error(`Method ${(option as any).method} not implemented`);
	}

	const jsoned = JSON.parse(decrypted);
	return jsoned;
};

export default decryptQuery;
