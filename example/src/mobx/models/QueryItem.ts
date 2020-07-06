import { observable, action } from 'mobx';

export class QueryItem {
	@observable type: 'string' | 'boolean' | 'number' = 'string';
	@observable name: string = '';
	@observable default: string | boolean | number = '';
	@observable hideIfDefault: boolean = false;

	constructor(
		name: string,
		type: 'string' | 'boolean' | 'number',
		defaultValue: string | boolean | number,
		hideIfDefault: boolean
	) {
		this.name = name;
		this.type = type;
		this.default = defaultValue;
		this.hideIfDefault = hideIfDefault;
	}

	@action setName(name: string) {
		this.name = name;
	}

	@action setDefault(defaultValue: string) {
		this.default = defaultValue;
		console.log('C', this.default);
	}
}
