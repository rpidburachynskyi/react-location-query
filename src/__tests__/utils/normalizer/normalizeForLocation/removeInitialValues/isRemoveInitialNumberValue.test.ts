import { ObjectNumber } from '../../../../../types/Initial/Number';
import isRemoveInitialNumberValue from '../../../../../utils/normalizer/normalizeForLocation/removeInitialValues/isRemoveInitialNumberValue';

describe('isRemoveInitialNumberValue', () => {
	it('should return true if is initial', () => {
		const firstInitialValue: ObjectNumber = {
			type: 'number',
			initial: 0,
			hideIfInitial: true
		};

		expect(isRemoveInitialNumberValue('0', firstInitialValue)).toBeTruthy();
		expect(isRemoveInitialNumberValue('1', firstInitialValue)).toBeFalsy();

		const secondInitialValue: ObjectNumber = {
			type: 'number',
			initial: 228,
			hideIfInitial: true
		};

		expect(
			isRemoveInitialNumberValue('1337', secondInitialValue)
		).toBeFalsy();
		expect(
			isRemoveInitialNumberValue('228', secondInitialValue)
		).toBeTruthy();

		const thirdInitialValue: ObjectNumber = {
			type: 'number',
			initial: -456,
			hideIfInitial: true
		};

		expect(
			isRemoveInitialNumberValue('-456', thirdInitialValue)
		).toBeTruthy();
		expect(
			isRemoveInitialNumberValue('228', thirdInitialValue)
		).toBeFalsy();
	});
});
