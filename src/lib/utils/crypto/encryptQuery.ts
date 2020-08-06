import CryptoOption from '../../stores/options/types/CryptoOptions';
import compressWithBase64 from './compres/base64/compressWithBase64';
import base64Encrypt from './methods/base64/base64Encrypt';
import xorEncrypt from './methods/xor/xorEncrypt';
import Options from '../../types/Options';

const encryptQuery = (query: object, options: Options) => {
	const jsoned = JSON.stringify(query);

	const option = options.crypto as Exclude<CryptoOption, false>;

	let encrypted = '';
	switch (option.method) {
		case 'base64':
			encrypted = base64Encrypt(jsoned);
			break;
		case 'xor':
			if (option.compessedToBase64)
				encrypted = compressWithBase64(xorEncrypt(jsoned, option.key));
			else encrypted = xorEncrypt(jsoned, option.key);
			break;
		default:
			throw new Error(`Method ${(option as any).method} not implemented`);
	}

	return encrypted;
};

export default encryptQuery;
