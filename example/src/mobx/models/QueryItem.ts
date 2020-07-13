import { observable, action } from 'mobx';
import { saveToLocalStorageItem } from './QueryItems';

export class QueryItem {
	@observable type: 'string' | 'boolean' | 'number' = 'string';
	@observable name: string = '';
	@observable initial: string | boolean | number = '';
	@observable hideIfInitial: boolean = false;
	@observable replaceValueWhenParsedError: boolean = false;
	@observable onParsedErrorString: string = '';
	@observable onParsedError: (value: any) => any = () => {
		return 223;
	};

	constructor(
		name: string,
		type: 'string' | 'boolean' | 'number',
		initial: string | boolean | number,
		hideIfInitial: boolean,
		replaceValueWhenParsedError: boolean,
		onParsedErrorString: string
	) {
		this.name = name;
		this.type = type;
		switch (type) {
			case 'number':
				this.initial = +initial;
				break;
			default:
				this.initial = initial;
				break;
		}
		this.hideIfInitial = hideIfInitial;
		this.replaceValueWhenParsedError = replaceValueWhenParsedError;
		this.onParsedError = () => 1337;
		this.onParsedErrorString = onParsedErrorString;
	}

	@action setName(name: string) {
		this.name = name;
	}

	@action setInitial(initial: string) {
		switch (this.type) {
			case 'boolean':
				this.initial = initial === 'true';
				break;
			case 'number':
				this.initial = +initial;
				break;
			case 'string':
			default:
				this.initial = initial;
				break;
		}
	}

	@action setHideIfInitial(hide: boolean) {
		this.hideIfInitial = hide;
		saveToLocalStorageItem(this);
	}

	@action setReplaceValueWhenParsedError(replace: boolean) {
		this.replaceValueWhenParsedError = replace;
		saveToLocalStorageItem(this);
	}

	@action setOnParsedError(onParsedError: (value: any) => any) {
		this.onParsedError = onParsedError;
		this.onParsedErrorString = onParsedError.toString();
		saveToLocalStorageItem(this);
	}
}
