import normalizeJson from '../../../../lib/utils/normalizer/normalizeForLocation/normalizeJson';

describe('normalizeJsonForLocation', () => {
	it('shold return some json value', () => {
		expect(normalizeJson({ name: 'Rostik', age: 20 })).toEqual(
			JSON.stringify({
				name: 'Rostik',
				age: 20
			})
		);
		expect(normalizeJson(123)).toEqual(JSON.stringify(123));
		expect(normalizeJson('123')).toEqual(JSON.stringify('123'));
		expect(normalizeJson(true)).toEqual(JSON.stringify(true));
	});
});
