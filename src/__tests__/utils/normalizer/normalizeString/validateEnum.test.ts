import validateEnum from '../../../../lib/utils/normalizer/normalizeString/validateEnum';

describe('validateEnum', () => {
	it('should should return same value', () => {
		expect(
			validateEnum('first', {
				type: 'string',
				initial: 'first',
				enum: ['first', 'second', 'third', 'fourth']
			})
		).toBe('first');

		expect(
			validateEnum('second', {
				type: 'string',
				initial: 'first',
				enum: ['first', 'second', 'third', 'fourth']
			})
		).toBe('second');

		expect(
			validateEnum('zero', {
				type: 'string',
				initial: 'minus first',
				enum: ['zero', 'minus first']
			})
		).toBe('zero');

		expect(
			validateEnum('minus first', {
				type: 'string',
				initial: 'minus first',
				enum: ['zero', 'minus first']
			})
		).toBe('minus first');

		expect(
			validateEnum('second', {
				type: 'string',
				initial: 'zero',
				enum: ['zero', 'minus first', 'second']
			})
		).toBe('second');
	});

	it('should should return initial value', () => {
		expect(
			validateEnum('zero', {
				type: 'string',
				initial: 'first',
				enum: ['first', 'second']
			})
		).toBe('first');

		expect(
			validateEnum('five', {
				type: 'string',
				initial: 'first',
				enum: ['zero', 'first', 'second']
			})
		).toBe('first');

		expect(
			validateEnum('five five five', {
				type: 'string',
				initial: 'five',
				enum: ['zero', 'five', 'second']
			})
		).toBe('five');

		expect(
			validateEnum('one hundred', {
				type: 'string',
				initial: 'first',
				enum: ['zero', 'first', 'second']
			})
		).toBe('first');

		expect(
			validateEnum('first', {
				type: 'string',
				initial: 'zero',
				enum: ['zero']
			})
		).toBe('zero');
	});

	it('should should return onNonEnum value', () => {
		expect(
			validateEnum('minus one', {
				type: 'string',
				initial: 'first',
				enum: {
					array: ['zero', 'first', 'second'],
					onNonEnum: () => 'first'
				}
			})
		).toBe('first');

		expect(
			validateEnum('five', {
				type: 'string',
				initial: 'one',
				enum: {
					array: ['one', 'two', 'three', 'four'],
					onNonEnum: () => 'four'
				}
			})
		).toBe('four');
	});
});
