import normalizeBoolean from '../../../utils/normalizer/normalizeBoolean';
import { ObjectBoolean } from '../../../types/Initial/Boolean';

describe('normalizeBoolean', () => {
	it('shold return some boolean value', () => {
		const firstInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: true
		};
		expect(normalizeBoolean(true, firstInitialValue)).toBe(true);
		expect(normalizeBoolean(false, firstInitialValue)).toBe(false);

		const secondInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: false
		};
		expect(normalizeBoolean(true, secondInitialValue)).toBe(true);
		expect(normalizeBoolean(false, secondInitialValue)).toBe(false);
	});

	it('shold return boolean value when passed correct string value', () => {
		const firstInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: true
		};
		expect(normalizeBoolean('true', firstInitialValue)).toBe(true);
		expect(normalizeBoolean('false', firstInitialValue)).toBe(false);

		const secondInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: false
		};
		expect(normalizeBoolean('true', secondInitialValue)).toBe(true);
		expect(normalizeBoolean('false', secondInitialValue)).toBe(false);
	});

	it('shold return initial value when passed uncorrect value', () => {
		const firstInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: true
		};
		expect(normalizeBoolean(firstInitialValue, firstInitialValue)).toBe(
			true
		);

		const secondInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: false
		};
		expect(normalizeBoolean(secondInitialValue, secondInitialValue)).toBe(
			false
		);
	});

	it('shold return initial value when passed initial value', () => {
		const firstInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: true
		};
		expect(normalizeBoolean(firstInitialValue, firstInitialValue)).toBe(
			true
		);

		const secondInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: false
		};
		expect(normalizeBoolean(secondInitialValue, secondInitialValue)).toBe(
			false
		);
	});

	it('shold return initial value when passed uncorrect value', () => {
		const firstInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: true
		};
		expect(normalizeBoolean('123', firstInitialValue)).toBe(true);

		const secondInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: false
		};
		expect(normalizeBoolean(123 as any, secondInitialValue)).toBe(false);
	});

	it('shold return onParsedError value when passed uncorrect value', () => {
		const firstInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: true,
			onParsedError: () => false
		};
		expect(normalizeBoolean('123', firstInitialValue)).toBe(false);

		const secondInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: false,
			onParsedError: () => true
		};
		expect(normalizeBoolean(123 as any, secondInitialValue)).toBe(true);
	});
});
