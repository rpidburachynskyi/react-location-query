import ObjectNumber from '../../../../lib/types/Initial/Number/Number';
import validate from '../../../../lib/utils/normalizer/normalizeNumber/validate';

describe('validate', () => {
	it('should should return validate value', () => {
		const firstInitialValue: ObjectNumber = {
			type: 'number',
			initial: 1,
			validate: () => 123
		};
		expect(validate(1, firstInitialValue)).toBe(123);
		expect(validate(123, firstInitialValue)).toBe(123);
		expect(validate(-1, firstInitialValue)).toBe(123);
		expect(validate(-123, firstInitialValue)).toBe(123);

		const secondInitialValue: ObjectNumber = {
			type: 'number',
			initial: 1,
			validate: (value: number) => (value > 100 ? 100 : value)
		};
		expect(validate(1, secondInitialValue)).toBe(1);
		expect(validate(123, secondInitialValue)).toBe(100);
		expect(validate(-1, secondInitialValue)).toBe(-1);
		expect(validate(-123, secondInitialValue)).toBe(-123);
		expect(validate(101, secondInitialValue)).toBe(100);
	});
});
