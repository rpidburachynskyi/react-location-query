import {
	InitialExtendValue,
	InitialObjectType
} from '../../../types/Initial/Initial';
import transformInitialArray from './transformInitialArray';
import { Context } from '../../../context/context';

const transformToInitialValue = (
	value: InitialExtendValue | string | number | boolean,
	context: Context
): InitialObjectType => {
	let initialValue: InitialObjectType;

	if (typeof value === 'object') {
		if ('type' in value) {
			initialValue = { ...value };
		} else {
			if (Array.isArray(value)) {
				initialValue = transformInitialArray(value);
			} else {
				throw new Error('Passed uncorrect object, please read docs');
			}
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
		hideIfInitial: context.defaultOptions.hideIfDefault,
		actionOnChange: context.defaultOptions.actionOnChange,
		active: true,
		...initialValue
	};

	return initialValue;
};

export default transformToInitialValue;
