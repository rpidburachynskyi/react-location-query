export const compareObjects = (obj1: object, obj2: object): boolean => {
	return compareObjectRecursive(obj1, obj2);
};

const compareObjectRecursive = (obj1: object, obj2: object): boolean => {
	let flag = true;

	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) return false;

	for (let i = 0; i < keys1.length; i++) {
		const key = keys1[i];
		const v1 = obj1[key];
		const v2 = obj2[key];

		if (typeof v1 === 'object') {
			if (typeof v2 !== 'object') return false;

			if (v1 === undefined) {
				if (v2 !== undefined) return false;
			}

			if (v1 === null) {
				if (v2 !== null) return false;
			}

			flag = compareObjectRecursive(v1, v2);
		} else if (typeof v1 === 'function') {
			if (typeof v2 !== 'function') return false;
			flag = v1.toString() === v2.toString();
		} else {
			flag = v1 === v2;
		}

		if (flag === false) return false;
	}

	return true;
};

export const hashFromObject = (obj: object | undefined) => {
	return JSON.stringify(
		hashFromObjectRecursive(obj !== undefined ? obj : {})
	);
};

const hashFromObjectRecursive = (obj: object) => {
	const keys = Object.keys(obj).sort();

	const result: any = {};

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = obj[key];

		if (typeof value === 'object') {
			result[key] = hashFromObjectRecursive(value);
		} else {
			result[key] = obj[key];
		}
	}

	return result;
};
