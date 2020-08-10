import isRemoveInitialStringValue from '../../../../../lib/utils/normalizer/normalizeForLocation/removeInitialValues/isRemoveInitialStringValue';
import { ObjectString } from '../../../../../lib/types/Initial/String/String';

describe('isRemoveInitialStringValue', () => {
	it('should return true if is initial', () => {
		const firstInitialValue: ObjectString = {
			type: 'string',
			initial: 'Rostyslav',
			hideIfInitial: true
		};

		expect(
			isRemoveInitialStringValue('Rostyslav', firstInitialValue)
		).toBeTruthy();
		expect(
			isRemoveInitialStringValue('false', firstInitialValue)
		).toBeFalsy();
		expect(
			isRemoveInitialStringValue('null', firstInitialValue)
		).toBeFalsy();
		expect(
			isRemoveInitialStringValue('undefined', firstInitialValue)
		).toBeFalsy();
		expect(isRemoveInitialStringValue('', firstInitialValue)).toBeFalsy();

		const secondInitialValue: ObjectString = {
			type: 'string',
			initial: '',
			hideIfInitial: true
		};

		expect(isRemoveInitialStringValue('', secondInitialValue)).toBeTruthy();
		expect(
			isRemoveInitialStringValue('qwejgashsdklfsdf', secondInitialValue)
		).toBeFalsy();
		expect(
			isRemoveInitialStringValue('null', secondInitialValue)
		).toBeFalsy();
		expect(
			isRemoveInitialStringValue('undefined', secondInitialValue)
		).toBeFalsy();
	});
});
