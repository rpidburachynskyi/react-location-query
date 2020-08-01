import { ObjectJson } from '../../../../lib/types/Initial/Json';
import normalizeJson from '../../../../lib/utils/normalizer/normalizeForUser/normalizeJson';

describe('normalizeJsonForUser', () => {
	it('shold return some json value', () => {
		const firstInitialValue: ObjectJson = {
			type: 'json',
			initial: { name: 'Rostyslav', age: 19 }
		};

		expect(
			normalizeJson({ name: 'Rostik', age: 20 }, firstInitialValue)
		).toStrictEqual({ name: 'Rostik', age: 20 });
		expect(
			normalizeJson(
				{ name: 'Rostik', married: false, age: 20 },
				firstInitialValue
			)
		).toStrictEqual({ name: 'Rostik', married: false, age: 20 });
		expect(normalizeJson({}, firstInitialValue)).toEqual({});
		expect(normalizeJson('"qwe"', firstInitialValue)).toBe('qwe');
		expect(normalizeJson('', firstInitialValue)).toStrictEqual({
			name: 'Rostyslav',
			age: 19
		});
		expect(normalizeJson(123, firstInitialValue)).toBe(123);
		expect(normalizeJson(-231, firstInitialValue)).toBe(-231);
		expect(normalizeJson(true, firstInitialValue)).toBe(true);
		expect(normalizeJson(false, firstInitialValue)).toBe(false);
		expect(normalizeJson('true', firstInitialValue)).toBe(true);
		expect(normalizeJson('false', firstInitialValue)).toBe(false);
	});

	it('shold return initial value when passed uncorrect value', () => {
		const firstInitialValue: ObjectJson = {
			type: 'json',
			initial: 'Initial json value'
		};

		expect(normalizeJson('{ qw }', firstInitialValue)).toBe(
			'Initial json value'
		);
		expect(normalizeJson('qwe1', firstInitialValue)).toBe(
			'Initial json value'
		);
	});

	it('shold return onParsedError value when passed uncorrect value', () => {
		const firstInitialValue: ObjectJson = {
			type: 'json',
			initial: 'Initial json value',
			onParsedError: () => ({ error: 'Parsed error' })
		};

		expect(normalizeJson('{ qw }', firstInitialValue)).toStrictEqual({
			error: 'Parsed error'
		});
		expect(normalizeJson('qwe1', firstInitialValue)).toStrictEqual({
			error: 'Parsed error'
		});
	});
});
