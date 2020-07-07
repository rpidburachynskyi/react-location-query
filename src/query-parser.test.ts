import { parseQuery, stringifyQuery } from './query-parser';

describe('query-parser', () => {
	it('parseQuery', () => {
		const query = '?name=Rostyslav';
		expect(parseQuery(query)).toEqual({ name: 'Rostyslav' });
		expect(parseQuery('')).toEqual({});
		expect(parseQuery('?')).toEqual({});
	});
	it('stringifyQuery', () => {
		expect(stringifyQuery({ name: 'Rostyslav' })).toEqual('name=Rostyslav');
		expect(
			stringifyQuery({
				name: 'Rostyslav',
				surname: 'Pidburachynskyi',
				year: {
					type: 'number',
					initial: 19
				},
				student: {
					type: 'boolean',
					initial: true
				}
			})
		).toEqual(
			'name=Rostyslav&surname=Pidburachynskyi&year=19&student=true'
		);
	});
});
