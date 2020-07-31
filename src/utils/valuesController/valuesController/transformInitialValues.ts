import {
	InitialExtendValue,
	InitialObjectType
} from '../../../types/Initial/Initial';
import { getDefaultOptions } from '../../../stores/options/options';
import { ActionOnChange } from '../../../types/ActionOnChange';
import transformInitialArray from './transformInitialArray';

const transformToInitialValue = (
	value: InitialExtendValue
): InitialObjectType => {
	if (typeof value === 'object') {
		if ('type' in value) return value;
		if (Array.isArray(value)) return transformInitialArray(value);

		throw new Error('Passed uncorrect object, please read docs');
	} else {
		switch (typeof value) {
			case 'string':
				return {
					type: 'string',
					initial: value,
					hideIfInitial: getDefaultOptions().hideIfDefault,
					replaceValueWhenParsedError: false,
					actionOnChange: ActionOnChange.Push
				};
			case 'number':
				return {
					type: 'number',
					initial: value,
					hideIfInitial: getDefaultOptions().hideIfDefault,
					replaceValueWhenParsedError: false,
					actionOnChange: ActionOnChange.Push
				};
			case 'boolean':
				return {
					type: 'boolean',
					initial: value,
					hideIfInitial: getDefaultOptions().hideIfDefault,
					replaceValueWhenParsedError: false,
					actionOnChange: ActionOnChange.Push
				};
			default:
				throw new Error(
					`Unsupported initial value type, got ${typeof value}`
				);
		}
	}
};

export default transformToInitialValue;
