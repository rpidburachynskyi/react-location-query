import compressWithBase64 from './compres/base64/compressWithBase64';
import base64Encrypt from './methods/base64/base64Encrypt';
import xorEncrypt from './methods/xor/xorEncrypt';
import CryptoOptions from '../../stores/options/types/CryptoOptions/CryptoOptions';

const encryptQuery = (query: object, crypto: CryptoOptions) => {
	const jsoned = JSON.stringify(query);
	let encrypted = '';
	switch (crypto.method) {
		case 'base64':
			encrypted = base64Encrypt(jsoned);
			break;
		case 'xor':
			if (crypto.compessedToBase64)
				encrypted = compressWithBase64(xorEncrypt(jsoned, crypto.key));
			else encrypted = xorEncrypt(jsoned, crypto.key);
			break;
		default:
			throw new Error(`Method ${(crypto as any).method} not implemented`);
	}

	return encrypted;
};

export default encryptQuery;
