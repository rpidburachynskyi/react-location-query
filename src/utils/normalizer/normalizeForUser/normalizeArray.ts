import { QueryValue } from '../../../types/Query';
import { InitialExtendValueWrapper } from '../../../types/Initial/Initial';
import { InitialExtendObjectArray } from '../../../types/Initial/Array';

const normalizeArray = (
	value: QueryValue | InitialExtendObjectArray,
	initialValueWrapper: InitialExtendValueWrapper<InitialExtendObjectArray>
) => {
	if (typeof value === 'object' && 'type' in value)
		return (value as InitialExtendObjectArray).initial;
	const normalizeArray = (
		type: 'string' | 'boolean' | 'number',
		array: Array<string | boolean | number>
	) => {
		let func: any;
		switch (type) {
			case 'boolean':
				func = (a: string | boolean) => {
					if (a === 'true') return true;
					if (a === 'false') return false;
					throw new Error('');
				};
				break;
			case 'number':
				func = (a: string | number) => {
					const _a = +a.toString();
					if (isNaN(_a)) throw new Error('');
					return _a;
				};
				break;
		}

		if (func) return array.map(func);
		return array;
	};
	const array = (Array.isArray(value) ? value : [value]) as Array<
		string | number | boolean
	>;
	return normalizeArray(initialValueWrapper.initialValue.arrayType, array);
};

export default normalizeArray;
