import { compareValues } from './values-controller';

describe('values-controller', () => {
	it('compareValues', () => {
		expect(compareValues('qwe', 'qwe')).toBeTruthy();
		expect(compareValues('qwe', 'ewq')).toBeFalsy();

		expect(compareValues(1, 1)).toBeTruthy();
		expect(compareValues(1, 2)).toBeFalsy();

		expect(compareValues(1, { type: 'number', default: 1 })).toBeTruthy();
		expect(compareValues(1, { type: 'number', default: 2 })).toBeFalsy();

		expect(
			compareValues(
				{ type: 'number', default: 1 },
				{ type: 'number', default: 1 }
			)
		).toBeTruthy();
		expect(
			compareValues(
				{ type: 'number', default: 2 },
				{ type: 'number', default: 1 }
			)
		).toBeFalsy();

		expect(compareValues(1, { type: 'number', default: 1 })).toBeTruthy();
		expect(compareValues(1, { type: 'number', default: 5 })).toBeFalsy();

		expect(
			compareValues(true, { type: 'boolean', default: true })
		).toBeTruthy();

		expect(
			compareValues(false, { type: 'boolean', default: true })
		).toBeFalsy();
	});
});
