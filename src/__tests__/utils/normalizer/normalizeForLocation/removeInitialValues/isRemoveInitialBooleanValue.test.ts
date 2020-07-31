import { ObjectBoolean } from '../../../../../types/Initial/Boolean';
import isRemoveInitialBooleanValue from '../../../../../utils/normalizer/normalizeForLocation/removeInitialValues/isRemoveInitialBooleanValue';

describe('isRemoveInitialBooleanValue', () => {
	it('should return true if is initial', () => {
		const firstInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: true,
			hideIfInitial: true
		};

		expect(
			isRemoveInitialBooleanValue('true', firstInitialValue)
		).toBeTruthy();
		expect(
			isRemoveInitialBooleanValue('false', firstInitialValue)
		).toBeFalsy();

		const secondInitialValue: ObjectBoolean = {
			type: 'boolean',
			initial: false,
			hideIfInitial: true
		};

		expect(
			isRemoveInitialBooleanValue('true', secondInitialValue)
		).toBeFalsy();
		expect(
			isRemoveInitialBooleanValue('false', secondInitialValue)
		).toBeTruthy();
	});
});
