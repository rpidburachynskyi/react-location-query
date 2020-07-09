import { compareValues } from '../values-controller';

describe('values-controller', () => {
	it('compareValues', () => {
		expect(compareValues('qwe', 'qwe')).toBeTruthy();
		expect(compareValues('qwe', 'ewq')).toBeFalsy();

		expect(compareValues('1', 1)).toBeTruthy();
		expect(compareValues('1', 2)).toBeFalsy();

		expect(compareValues('1', { type: 'number', initial: 1 })).toBeTruthy();
		expect(compareValues('1', { type: 'number', initial: 2 })).toBeFalsy();

		expect(compareValues('1', { type: 'number', initial: 1 })).toBeTruthy();
		expect(compareValues('1', { type: 'number', initial: 5 })).toBeFalsy();

		expect(
			compareValues('true', { type: 'boolean', initial: true })
		).toBeTruthy();

		expect(
			compareValues('false', { type: 'boolean', initial: true })
		).toBeFalsy();

		expect(
			compareValues('', { type: 'boolean', initial: true })
		).toBeFalsy();

		expect(
			compareValues('qweddfgdf', { type: 'boolean', initial: true })
		).toBeFalsy();
	});
});
