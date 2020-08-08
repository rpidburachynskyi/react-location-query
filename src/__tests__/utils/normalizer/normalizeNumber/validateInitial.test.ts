import validateInitial from '../../../../lib/utils/normalizer/normalizeNumber/validateInitial';

describe('validateInitial', () => {
	it('should should return initial value', () => {
		expect(
			validateInitial(
				{
					type: 'number',
					initial: 1
				},
				{
					type: 'number',
					initial: 1
				}
			)
		).toBe(1);

		expect(
			validateInitial(
				{
					type: 'number',
					initial: 123
				},
				{
					type: 'number',
					initial: 123
				}
			)
		).toBe(123);
	});

	it('should should return passed value', () => {
		expect(
			validateInitial(2, {
				type: 'number',
				initial: 1
			})
		).toBe(2);
		expect(
			validateInitial(123, {
				type: 'number',
				initial: 123
			})
		).toBe(123);
	});
});
