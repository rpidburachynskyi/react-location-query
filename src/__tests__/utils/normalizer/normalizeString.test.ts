import { ObjectNumber } from '../../../types/Initial/Number';
import normalizeNumber from '../../../utils/normalizer/normalizeNumber';
import { ObjectString } from '../../../types/Initial/String';
import normalizeString from '../../../utils/normalizer/normalizeString';

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

	it('shold return onParsedEnumError value when passed string not from enum', () => {
		const firstInitialValue: ObjectString = {
			type: 'string',
			initial: 'github',
			enum: ['github', 'gitlab'],
			onParsedEnumError: () => 'gitlab'
		};

		expect(normalizeString('1', firstInitialValue)).toBe('gitlab');
		expect(normalizeString('bitbucket', firstInitialValue)).toBe('gitlab');
	});
});
