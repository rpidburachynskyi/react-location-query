import { ObjectArray } from '../../../types/Initial/Array';
import { getDefaultOptions } from '../../../stores/options/options';
import { ActionOnChange } from '../../../types/ActionOnChange';

const transformInitialArray = <T>(array: Array<T>): ObjectArray => {
	checkAllItemsType(array, typeof array[0]);

	switch (typeof array[0]) {
		case 'string':
			return {
				type: 'array',
				arrayType: 'string',
				initial: (array as any) as Array<string>,
				hideIfInitial: getDefaultOptions().hideIfDefault,
				replaceValueWhenParsedError: false,
				actionOnChange: ActionOnChange.Push
			};
		case 'number':
			return {
				type: 'array',
				arrayType: 'number',
				initial: (array as any) as Array<number>,
				hideIfInitial: getDefaultOptions().hideIfDefault,
				replaceValueWhenParsedError: false,
				actionOnChange: ActionOnChange.Push
			};
		case 'boolean':
			return {
				type: 'array',
				arrayType: 'boolean',
				initial: (array as any) as Array<boolean>,
				hideIfInitial: getDefaultOptions().hideIfDefault,
				replaceValueWhenParsedError: false,
				actionOnChange: ActionOnChange.Push
			};
		default:
			throw new Error('Unsupported array type');
	}
};

const checkAllItemsType = (array: Array<any>, type: string) => {
	array.forEach((item) => {
		if (typeof item !== type)
			throw new Error('All items in array must be same type');
	});
};

export default transformInitialArray;
