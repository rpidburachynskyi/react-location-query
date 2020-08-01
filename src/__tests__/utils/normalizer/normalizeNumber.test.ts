import { ObjectNumber } from '../../../lib/types/Initial/Number';
import normalizeNumber from '../../../lib/utils/normalizer/normalizeNumber';

describe('normalizeNumber', () => {
	it('shold return some number value', () => {
		const firstInitialValue: ObjectNumber = {
			type: 'number',
			initial: 1
		};
		expect(normalizeNumber(1, firstInitialValue)).toBe(1);
		expect(normalizeNumber(456, firstInitialValue)).toBe(456);
		expect(normalizeNumber(-1, firstInitialValue)).toBe(-1);
		expect(normalizeNumber(-1000, firstInitialValue)).toBe(-1000);
	});
	it('shold return number value when passed string', () => {
		const firstInitialValue: ObjectNumber = {
			type: 'number',
			initial: 1
		};
		expect(normalizeNumber('1', firstInitialValue)).toBe(1);
		expect(normalizeNumber('456', firstInitialValue)).toBe(456);
		expect(normalizeNumber('-1', firstInitialValue)).toBe(-1);
		expect(normalizeNumber('-1000', firstInitialValue)).toBe(-1000);
	});

	it('shold return initial value when passed uncorrect value', () => {
		const firstInitialValue: ObjectNumber = {
			type: 'number',
			initial: 1
		};
		const secondInitialValue: ObjectNumber = {
			type: 'number',
			initial: 1000
		};
		const thirdInitialValue: ObjectNumber = {
			type: 'number',
			initial: -247
		};

		expect(normalizeNumber('q', firstInitialValue)).toBe(1);
		expect(normalizeNumber('qweqweqwe', secondInitialValue)).toBe(1000);
		expect(normalizeNumber('q1', thirdInitialValue)).toBe(-247);
		expect(normalizeNumber('1q', firstInitialValue)).toBe(1);
		expect(normalizeNumber('q1q', secondInitialValue)).toBe(1000);
		expect(normalizeNumber('one', thirdInitialValue)).toBe(-247);
		expect(normalizeNumber('Rostyslav', firstInitialValue)).toBe(1);
	});

	it('shold return onParsedError value when passed uncorrect value', () => {
		const firstInitialValue: ObjectNumber = {
			type: 'number',
			initial: 1,
			onParsedError: () => 51
		};
		const secondInitialValue: ObjectNumber = {
			type: 'number',
			initial: 1000,
			onParsedError: () => 38
		};
		const thirdInitialValue: ObjectNumber = {
			type: 'number',
			initial: -247,
			onParsedError: () => -266
		};

		expect(normalizeNumber('q', firstInitialValue)).toBe(51);
		expect(normalizeNumber('qweqweqwe', secondInitialValue)).toBe(38);
		expect(normalizeNumber('q1', thirdInitialValue)).toBe(-266);
		expect(normalizeNumber('1q', firstInitialValue)).toBe(51);
		expect(normalizeNumber('q1q', secondInitialValue)).toBe(38);
		expect(normalizeNumber('one', thirdInitialValue)).toBe(-266);
		expect(normalizeNumber('Rostyslav', firstInitialValue)).toBe(51);
	});

	it('shold return onValidateError value when passed not validate value', () => {
		const firstInitialValue: ObjectNumber = {
			type: 'number',
			initial: 1,
			onParsedError: () => 51,
			validate: (value) => {
				if (value > 123) return 123;
				return value;
			}
		};

		expect(normalizeNumber(237, firstInitialValue)).toBe(123);
		expect(normalizeNumber(124, firstInitialValue)).toBe(123);
		expect(normalizeNumber(122, firstInitialValue)).toBe(122);
	});
});
