import isRemoveInitialArrayStringValue from '../../../../../../lib/utils/normalizer/normalizeForLocation/removeInitialValues/isRemoveInitialArrayValue/isRemoveInitialArrayStringValue';
import { ObjectArrayString } from '../../../../../../lib/types/Initial/Array';

describe('isRemoveInitialArrayStringValue', () => {
	it('should return true if is initial', () => {
		const firstInitialValue: ObjectArrayString = {
			type: 'array',
			arrayType: 'string',
			initial: ['first'],
			hideIfInitial: true
		};

		expect(
			isRemoveInitialArrayStringValue(['first'], firstInitialValue)
		).toBeTruthy();
		expect(
			isRemoveInitialArrayStringValue(['1'], firstInitialValue)
		).toBeFalsy();
		expect(
			isRemoveInitialArrayStringValue(['second'], firstInitialValue)
		).toBeFalsy();

		const secondInitialValue: ObjectArrayString = {
			type: 'array',
			arrayType: 'string',
			initial: ['second'],
			hideIfInitial: true
		};

		expect(
			isRemoveInitialArrayStringValue(['second'], secondInitialValue)
		).toBeTruthy();
		expect(
			isRemoveInitialArrayStringValue(['2'], secondInitialValue)
		).toBeFalsy();
		expect(
			isRemoveInitialArrayStringValue(['first'], secondInitialValue)
		).toBeFalsy();

		const thirdInitialValue: ObjectArrayString = {
			type: 'array',
			arrayType: 'string',
			initial: ['first', 'second'],
			hideIfInitial: true
		};

		expect(
			isRemoveInitialArrayStringValue(
				['first', 'second'],
				thirdInitialValue
			)
		).toBeTruthy();
		expect(
			isRemoveInitialArrayStringValue(['1', '2'], thirdInitialValue)
		).toBeFalsy();
		expect(
			isRemoveInitialArrayStringValue(
				['first', 'third'],
				thirdInitialValue
			)
		).toBeFalsy();
	});
});
