import { compareObjects, hashFromObject } from '../../lib/utils/objects';

describe('objects', () => {
	it('compareObjects', () => {
		expect(compareObjects({}, {})).toBeTruthy();

		expect(compareObjects({}, { name: 'string' })).toBeFalsy();

		expect(compareObjects({ name: 'string' }, {})).toBeFalsy();

		expect(
			compareObjects({ name: 'string' }, { name: 'string' })
		).toBeTruthy();

		expect(
			compareObjects(
				{ name: 'string', age: 19 },
				{ name: 'string', age: 19 }
			)
		).toBeTruthy();

		expect(
			compareObjects(
				{ age: 19, name: 'string' },
				{ name: 'string', age: 19 }
			)
		).toBeTruthy();
	});

	it('hashFromObject', () => {
		expect(hashFromObject({})).toEqual(hashFromObject({}));
		expect(hashFromObject({ name: '' })).not.toEqual(hashFromObject({}));
		expect(hashFromObject({})).not.toEqual(hashFromObject({ name: '' }));
		expect(hashFromObject({ name: '' })).toEqual(
			hashFromObject({ name: '' })
		);
		expect(hashFromObject({ name: '', age: 19 })).toEqual(
			hashFromObject({ age: 19, name: '' })
		);
	});
});
