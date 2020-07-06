import { QueryItem } from './QueryItem';
import { observable, action } from 'mobx';

export class QueryItems {
	@observable items: QueryItem[] = [];

	@action addQueryItem(
		name: string,
		type: 'string' | 'boolean' | 'number',
		defaultValue: string | boolean | number,
		hideIfDefault: boolean
	) {
		this.items = [
			...this.items,
			new QueryItem(name, type, defaultValue, hideIfDefault)
		];
	}
}
