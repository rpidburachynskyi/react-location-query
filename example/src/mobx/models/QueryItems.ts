import { QueryItem } from './QueryItem';
import { observable, action } from 'mobx';

export class QueryItems {
	@observable items: QueryItem[] = loadFromLocalStorage().map(
		({ name, type, default: defaultv, hideIfDefault }: any) =>
			new QueryItem(name, type, defaultv, hideIfDefault)
	);

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

		saveToLocalStorage(this.items);
	}
}

const loadFromLocalStorage = () =>
	JSON.parse(localStorage.getItem('QUERY_ITEMS') ?? '[]');

const saveToLocalStorage = (queryItems: QueryItem[]) =>
	localStorage.setItem('QUERY_ITEMS', JSON.stringify(queryItems));
