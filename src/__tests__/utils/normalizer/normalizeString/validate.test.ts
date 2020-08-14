import validate from '../../../../lib/utils/normalizer/normalizeString/validate';
import ObjectString from '../../../../lib/types/Initial/String/String';

describe('validate', () => {
	it('should should return validate value', () => {
		const firstInitialValue: ObjectString = {
			type: 'string',
			initial: 'initial',
			validate: () => 'from validate'
		};
		expect(validate('one', firstInitialValue)).toBe('from validate');
		expect(validate('one hundred', firstInitialValue)).toBe(
			'from validate'
		);
		expect(validate('any', firstInitialValue)).toBe('from validate');

		const secondInitialValue: ObjectString = {
			type: 'string',
			initial: 'initial',
			validate: (value) =>
				value.length > 10 ? value.substring(0, 10) : value
		};
		expect(validate('1234567890', secondInitialValue)).toBe('1234567890');
		expect(validate('1234567890_', secondInitialValue)).toBe('1234567890');
	});
});
