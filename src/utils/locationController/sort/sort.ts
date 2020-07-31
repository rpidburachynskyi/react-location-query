import { getInitialValuesWrappers } from '../../valuesController/valuesController/valuesController';
import { Context } from '../../../context/context';
import sortByIndex from './sortByIndex';
import sortByAlphabet from './sortByAlphabet';
import sortByFieldLength from './sortByFieldLength';

export const sortFieldsInQuery = (query: object, context: Context) => {
	const result = {};
	const sortedKeys = sortBy(Object.keys(query), context);
	(context.sortOptions.sortOrder === 'asc'
		? sortedKeys
		: sortedKeys.reverse()
	).forEach((key) => {
		result[key] = query[key];
	});

	return result;
};

const sortBy = (queryKeys: string[], context: Context): string[] => {
	switch (context.sortOptions.sortBy) {
		case 'order':
			return queryKeys.sort(
				sortByIndex(getInitialValuesWrappers(context))
			);
		case 'alphabet':
			return queryKeys.sort(sortByAlphabet);
		case 'fieldLength':
			return queryKeys.sort(sortByFieldLength);
	}
};
