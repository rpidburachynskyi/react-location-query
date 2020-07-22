import xorEncrypt from './xorEncrypt';

const xorDecrypt = (text: string, key: string) => {
	return xorEncrypt(text, key);
};

export default xorDecrypt;
