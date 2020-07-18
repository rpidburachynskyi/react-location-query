export const compareObjects = (obj1: object, obj2: object): boolean => {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const hashFromObject = (obj: object) => {
	return JSON.stringify(obj);
};
