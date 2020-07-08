import { observable, action } from 'mobx';
import { saveToLocalStorageItem } from './QueryItems';

export class QueryItem {
	@observable type: 'string' | 'boolean' | 'number' = 'string';
	@observable name: string = '';
	@observable initial: string | boolean | number = '';
	@observable hideIfInitial: boolean = false;

	constructor(
		name: string,
		type: 'string' | 'boolean' | 'number',
		initial: string | boolean | number,
		hideIfInitial: boolean
	) {
		this.name = name;
		this.type = type;
		this.initial = initial;
		this.hideIfInitial = hideIfInitial;
	}

	@action setName(name: string) {
		this.name = name;
	}

	@action setInitial(initial: string) {
		this.initial = initial;
	}

	@action setHideIfInitial(hide: boolean) {
		this.hideIfInitial = hide;
		saveToLocalStorageItem(this);
	}
}
