import { ObjectArray } from '../../../../../../types/Initial/Array';
import isRemoveInitialArrayValue from '../../../../../../utils/normalizer/normalizeForLocation/removeInitialValues/isRemoveInitialArrayValue';

describe('isRemoveInitialArrayValue', () => {
	it('should return false if arrays length not same', () => {
		const firstInitialValue: ObjectArray = {
			type: 'array',
			arrayType: 'string',
			initial: ['first'],
			hideIfInitial: true
		};

		expect(
			isRemoveInitialArrayValue(['first'], firstInitialValue)
		).toBeTruthy();
		expect(
			isRemoveInitialArrayValue(['first', 'false'], firstInitialValue)
		).toBeFalsy();
	});
});
