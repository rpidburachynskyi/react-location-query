import { compareValues } from './values-controller';

describe('values-controller', () => {
	it('compareValues', () => {
		expect(compareValues('qwe', 'qwe')).toBeTruthy();
	});
});
