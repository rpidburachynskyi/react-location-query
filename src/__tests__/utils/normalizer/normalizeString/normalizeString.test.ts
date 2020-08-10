import normalizeString from '../../../../lib/utils/normalizer/normalizeString/normalizeString';
import ObjectString from '../../../../lib/types/Initial/String/String';

describe('normalizeString', () => {
	it('shold return some string value', () => {
		const firstInitialValue: ObjectString = {
			type: 'string',
			initial: 'Rostyslav'
		};
		expect(normalizeString('qwe', firstInitialValue)).toBe('qwe');
		expect(normalizeString('', firstInitialValue)).toBe('');
		expect(normalizeString('123', firstInitialValue)).toBe('123');
		expect(normalizeString('true', firstInitialValue)).toBe('true');
		expect(normalizeString('false', firstInitialValue)).toBe('false');
	});

	it('shold return value from when passed string from enum', () => {
		const firstInitialValue: ObjectString = {
			type: 'string',
			initial: 'github',
			enum: ['github', 'gitlab']
		};

		expect(normalizeString('github', firstInitialValue)).toBe('github');
		expect(normalizeString('gitlab', firstInitialValue)).toBe('gitlab');
	});

	it('shold return initial value when passed string not from enum', () => {
		const firstInitialValue: ObjectString = {
			type: 'string',
			initial: 'github',
			enum: ['github', 'gitlab']
		};

		expect(normalizeString('1', firstInitialValue)).toBe('github');
		expect(normalizeString('bitbucket', firstInitialValue)).toBe('github');
	});

	it('shold return onNonEnum value when passed string not from enum', () => {
		const firstInitialValue: ObjectString = {
			type: 'string',
			initial: 'github',
			enum: {
				array: ['github', 'gitlab'],
				onNonEnum: () => 'gitlab'
			}
		};

		expect(normalizeString('1', firstInitialValue)).toBe('gitlab');
		expect(normalizeString('bitbucket', firstInitialValue)).toBe('gitlab');
	});
});
