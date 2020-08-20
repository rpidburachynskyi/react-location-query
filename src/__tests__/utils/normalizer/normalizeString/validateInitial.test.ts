import validateInitial from '../../../../lib/utils/normalizer/normalizeString/validateInitial';

describe('validateInitial', () => {
	it('should should return initial value', () => {
		expect(
			validateInitial(
				{
					type: 'string',
					initial: 'My string'
				},
				{
					type: 'string',
					initial: 'My string'
				}
			)
		).toBe('My string');

		expect(
			validateInitial(
				{
					type: 'string',
					initial: ''
				},
				{
					type: 'string',
					initial: ''
				}
			)
		).toBe('');
	});

	it('should should return passed value', () => {
		expect(
			validateInitial('', {
				type: 'string',
				initial: 'My string'
			})
		).toBe('');
		expect(
			validateInitial('My string value', {
				type: 'string',
				initial: ''
			})
		).toBe('My string value');
	});
});
