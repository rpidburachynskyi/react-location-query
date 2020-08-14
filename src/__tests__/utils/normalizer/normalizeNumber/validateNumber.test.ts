import validateNumber from '../../../../lib/utils/normalizer/normalizeNumber/validateNumber';
import ObjectNumber from '../../../../lib/types/Initial/Number/Number';

describe('validateNumber', () => {
	it('should should return transformed value', () => {
		expect(
			validateNumber('123', {
				type: 'number',
				initial: 1
			})
		).toBe(123);

		expect(
			validateNumber('-228', {
				type: 'number',
				initial: 123
			})
		).toBe(-228);
	});

	it('should should return passed value', () => {
		expect(
			validateNumber(2, {
				type: 'number',
				initial: 1
			})
		).toBe(2);
		expect(
			validateNumber(123, {
				type: 'number',
				initial: 123
			})
		).toBe(123);
	});

	it('should should return initial value if passed uncorrect', () => {
		expect(
			validateNumber('2q', {
				type: 'number',
				initial: 1
			})
		).toBe(1);
		expect(
			validateNumber('q2', {
				type: 'number',
				initial: 123
			})
		).toBe(123);
		expect(
			validateNumber('o', {
				type: 'number',
				initial: 123
			})
		).toBe(123);
	});
	it('should should return onParsedError value if passed uncorrect', () => {
		expect(
			validateNumber('2q', {
				type: 'number',
				initial: 1,
				onParsedError: () => 2
			})
		).toBe(2);

		expect(
			validateNumber('q2', {
				type: 'number',
				initial: 123,
				onParsedError: () => 228
			})
		).toBe(228);

		const initialValue: ObjectNumber = {
			type: 'number',
			initial: 123,
			onParsedError: (value: string) => {
				if (value === 'o') return 0;
				return 1;
			}
		};

		expect(validateNumber('o', initialValue)).toBe(0);
		expect(validateNumber('t', initialValue)).toBe(1);
	});
});
