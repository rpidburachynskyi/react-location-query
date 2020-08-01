import isRemoveInitialArrayBooleanValue from '../../../../../../lib/utils/normalizer/normalizeForLocation/removeInitialValues/isRemoveInitialArrayValue/isRemoveInitialArrayBooleanValue';
import { ObjectArrayBoolean } from '../../../../../../lib/types/Initial/Array';

describe('isRemoveInitialArrayBooleanValue', () => {
	it('should return true if is initial', () => {
		const firstInitialValue: ObjectArrayBoolean = {
			type: 'array',
			arrayType: 'boolean',
			initial: [true, true, true, false],
			hideIfInitial: true
		};

		expect(
			isRemoveInitialArrayBooleanValue(
				['true', 'true', 'true', 'false'],
				firstInitialValue
			)
		).toBeTruthy();
		expect(
			isRemoveInitialArrayBooleanValue(
				['false', 'false', 'false', 'false'],
				firstInitialValue
			)
		).toBeFalsy();
		expect(
			isRemoveInitialArrayBooleanValue(
				['true', 'true', 'true', 'true'],
				firstInitialValue
			)
		).toBeFalsy();

		const secondInitialValue: ObjectArrayBoolean = {
			type: 'array',
			arrayType: 'boolean',
			initial: [true],
			hideIfInitial: true
		};

		expect(
			isRemoveInitialArrayBooleanValue(['true'], secondInitialValue)
		).toBeTruthy();
		expect(
			isRemoveInitialArrayBooleanValue(['false'], secondInitialValue)
		).toBeFalsy();

		const thirdInitialValue: ObjectArrayBoolean = {
			type: 'array',
			arrayType: 'boolean',
			initial: [false],
			hideIfInitial: true
		};

		expect(
			isRemoveInitialArrayBooleanValue(['false'], thirdInitialValue)
		).toBeTruthy();
		expect(
			isRemoveInitialArrayBooleanValue(['true'], thirdInitialValue)
		).toBeFalsy();

		const fourthInitialValue: ObjectArrayBoolean = {
			type: 'array',
			arrayType: 'boolean',
			initial: [true, false, true, false],
			hideIfInitial: true
		};

		expect(
			isRemoveInitialArrayBooleanValue(
				['true', 'false', 'true', 'false'],
				fourthInitialValue
			)
		).toBeTruthy();
		expect(
			isRemoveInitialArrayBooleanValue(['true'], fourthInitialValue)
		).toBeFalsy();
		expect(
			isRemoveInitialArrayBooleanValue(
				['false', 'true', 'false', 'true'],
				fourthInitialValue
			)
		).toBeFalsy();
		expect(
			isRemoveInitialArrayBooleanValue(
				['true', 'false', 'false', 'true'],
				fourthInitialValue
			)
		).toBeFalsy();
	});
});
