import {
	InitialExtendValue,
	InitialObjectType
} from '../../../types/Initial/Initial';
import { ActionOnChange } from '../../../types/ActionOnChange';
import transformInitialArray from './transformInitialArray';
import { Context } from '../../../context/context';

const transformToInitialValue = (
	value: InitialExtendValue,
	context: Context
): InitialObjectType => {
	let initialValue: InitialObjectType;

	if (typeof value === 'object') {
		if ('type' in value) return value;
		if (Array.isArray(value)) {
			initialValue = transformInitialArray(value);
		} else {
			throw new Error('Passed uncorrect object, please read docs');
		}
	} else {
		switch (typeof value) {
			case 'string':
				initialValue = {
					type: 'string',
					initial: value
				};
				break;
			case 'number':
				initialValue = {
					type: 'number',
					initial: value
				};
				break;
			case 'boolean':
				initialValue = {
					type: 'boolean',
					initial: value
				};
				break;
			default:
				throw new Error(
					`Unsupported initial value type, got ${typeof value}`
				);
		}
	}

	initialValue = {
		...initialValue,
		hideIfInitial: context.defaultOptions.hideIfDefault,
		replaceValueWhenParsedError: false,
		actionOnChange: ActionOnChange.Push
	};

	return initialValue;
};

export default transformToInitialValue;
