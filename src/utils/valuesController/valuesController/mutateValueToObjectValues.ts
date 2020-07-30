import {
	InitialExtendValue,
	InitialObjectType
} from '../../../types/Initial/Initial';
import { getDefaultOptions } from '../../../stores/options/options';

const mutateValueToObjectValues = (
	value: InitialExtendValue
): InitialObjectType => {
	if (typeof value === 'object') {
		return value;
	} else {
		switch (typeof value) {
			case 'string':
				return {
					type: 'string',
					initial: value,
					hideIfInitial: getDefaultOptions().hideIfDefault,
					replaceValueWhenParsedError: false
				};
			case 'number':
				return {
					type: 'number',
					initial: value,
					hideIfInitial: getDefaultOptions().hideIfDefault,
					replaceValueWhenParsedError: false
				};
			case 'boolean':
				return {
					type: 'boolean',
					initial: value,
					hideIfInitial: getDefaultOptions().hideIfDefault,
					replaceValueWhenParsedError: false
				};
		}
	}
};

export default mutateValueToObjectValues;
