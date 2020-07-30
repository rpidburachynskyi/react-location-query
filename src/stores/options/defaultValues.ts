import { Object } from '../../types/Initial/Initial';

export const defaultValueByInitialValue = (value: Object) => {
	switch (value.type) {
		case 'string':
			return '';
		case 'number':
			return 0;
		case 'boolean':
			return false;
		case 'json':
			return {};
		case 'array': {
			switch (value.arrayType) {
				case 'boolean':
					return [false];
				case 'number':
					return [false];
				case 'string':
					return [''];
			}
		}
	}
};
