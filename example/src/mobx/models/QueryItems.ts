import { QueryItem } from './QueryItem';
import { observable, action } from 'mobx';

export class QueryItems {
	@observable items: QueryItem[] = loadFromLocalStorage().map(
		({ name, type, initial, hideIfInitial }: any) =>
			new QueryItem(name, type, initial, hideIfInitial)
	);

	@action addQueryItem(
		name: string,
		type: 'string' | 'boolean' | 'number',
		initial: string | boolean | number,
		hideIfInitial: boolean
	) {
		this.items = [
			...this.items,
			new QueryItem(name, type, initial, hideIfInitial)
		];

		saveToLocalStorage(this.items);
	}
}

const loadFromLocalStorage = () =>
	JSON.parse(localStorage.getItem('QUERY_ITEMS') ?? '[]');

const saveToLocalStorage = (queryItems: QueryItem[]) =>
	localStorage.setItem('QUERY_ITEMS', JSON.stringify(queryItems));

export const saveToLocalStorageItem = (item: QueryItem) =>
	saveToLocalStorage([
		...loadFromLocalStorage().filter((i: any) => i.name !== item.name),
		item
	]);
