import validateInteger from '../../../../lib/utils/normalizer/normalizeNumber/validateInteger';

describe('validateInteger', () => {
	it('should should return same value', () => {
		expect(
			validateInteger(1, {
				type: 'number',
				initial: 1,
				integer: true
			})
		).toBe(1);

		expect(
			validateInteger(123, {
				type: 'number',
				initial: 123,
				integer: true
			})
		).toBe(123);
	});

	it('should should return integer value', () => {
		expect(
			validateInteger(1.05, {
				type: 'number',
				initial: 1,
				integer: true
			})
		).toBe(1);

		expect(
			validateInteger(5.49, {
				type: 'number',
				initial: 123,
				integer: true
			})
		).toBe(5);

		expect(
			validateInteger(5.5, {
				type: 'number',
				initial: 123,
				integer: true
			})
		).toBe(5);

		expect(
			validateInteger(5.51, {
				type: 'number',
				initial: 123,
				integer: true
			})
		).toBe(5);

		expect(
			validateInteger(5.99, {
				type: 'number',
				initial: 123,
				integer: true
			})
		).toBe(5);
	});
});
