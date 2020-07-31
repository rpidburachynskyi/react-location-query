import { ObjectArrayNumber } from '../../../../../../types/Initial/Array';
import isRemoveInitialArrayNumberValue from '../../../../../../utils/normalizer/normalizeForLocation/removeInitialValues/isRemoveInitialArrayValue/isRemoveInitialArrayNumberValue';

describe('isRemoveInitialArrayNumberValue', () => {
	it('should return true if is initial', () => {
		const firstInitialValue: ObjectArrayNumber = {
			type: 'array',
			arrayType: 'number',
			initial: [1, 2, 3],
			hideIfInitial: true
		};

		expect(
			isRemoveInitialArrayNumberValue(['1', '2', '3'], firstInitialValue)
		).toBeTruthy();
		expect(
			isRemoveInitialArrayNumberValue(['1', '1', '1'], firstInitialValue)
		).toBeFalsy();
		expect(
			isRemoveInitialArrayNumberValue(['2', '2', '2'], firstInitialValue)
		).toBeFalsy();
		expect(
			isRemoveInitialArrayNumberValue(['3', '3', '3'], firstInitialValue)
		).toBeFalsy();
		expect(
			isRemoveInitialArrayNumberValue(['3', '2', '1'], firstInitialValue)
		).toBeFalsy();

		const secondInitialValue: ObjectArrayNumber = {
			type: 'array',
			arrayType: 'number',
			initial: [1],
			hideIfInitial: true
		};

		expect(
			isRemoveInitialArrayNumberValue(['1'], secondInitialValue)
		).toBeTruthy();
		expect(
			isRemoveInitialArrayNumberValue(['2'], secondInitialValue)
		).toBeFalsy();

		const thirdInitialValue: ObjectArrayNumber = {
			type: 'array',
			arrayType: 'number',
			initial: [2],
			hideIfInitial: true
		};

		expect(
			isRemoveInitialArrayNumberValue(['2'], thirdInitialValue)
		).toBeTruthy();
		expect(
			isRemoveInitialArrayNumberValue(['1'], thirdInitialValue)
		).toBeFalsy();
	});
});
