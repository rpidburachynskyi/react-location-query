interface None {
	method: 'none';
}

interface Base64Option {
	method: 'base64';
}

interface XorOption {
	method: 'xor';
	key: string;
	compessedToBase64: boolean;
}

type CryptoOptions = None | Base64Option | XorOption;

export default CryptoOptions;
