interface Base64Option {
	method: 'base64';
}

interface XorOption {
	method: 'xor';
	key: string;
	compessedToBase64: boolean;
}

type CryptoOption = false | Base64Option | XorOption;

export default CryptoOption;
