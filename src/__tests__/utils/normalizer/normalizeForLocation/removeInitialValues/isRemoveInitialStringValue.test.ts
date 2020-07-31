import isRemoveInitialStringValue from '../../../../../utils/normalizer/normalizeForLocation/removeInitialValues/isRemoveInitialStringValue';
import { ObjectString } from '../../../../../types/Initial/String';

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
