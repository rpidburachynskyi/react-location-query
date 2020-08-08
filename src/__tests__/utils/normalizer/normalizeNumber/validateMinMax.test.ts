import validateMinMax from '../../../../lib/utils/normalizer/normalizeNumber/validateMinMax';

describe('validateMinMax', () => {
	it('should should return same value', () => {
		expect(
			validateMinMax(1, {
				type: 'number',
				initial: 1,
				min: 0,
				max: 9
			})
		).toBe(1);

		expect(
			validateMinMax(123, {
				type: 'number',
				initial: 123,
				min: 0,
				max: 228
			})
		).toBe(123);

		expect(
			validateMinMax(-30, {
				type: 'number',
				initial: -30,
				min: -50,
				max: -25
			})
		).toBe(-30);

		expect(
			validateMinMax(1, {
				type: 'number',
				initial: 1,
				min: 1,
				max: 100
			})
		).toBe(1);

		expect(
			validateMinMax(100, {
				type: 'number',
				initial: 1,
				min: 1,
				max: 100
			})
		).toBe(100);
	});

	it('should should return min value', () => {
		expect(
			validateMinMax(-1, {
				type: 'number',
				initial: 1,
				min: 0
			})
		).toBe(0);

		expect(
			validateMinMax(-60, {
				type: 'number',
				initial: 123,
				min: 0,
				max: 228
			})
		).toBe(0);

		expect(
			validateMinMax(-30, {
				type: 'number',
				initial: -20,
				min: -25,
				max: -20
			})
		).toBe(-25);

		expect(
			validateMinMax(1, {
				type: 'number',
				initial: 1,
				min: 2,
				max: 100
			})
		).toBe(2);

		expect(
			validateMinMax(100, {
				type: 'number',
				initial: 300,
				min: 200
			})
		).toBe(200);
	});

	it('should should return max value', () => {
		expect(
			validateMinMax(1, {
				type: 'number',
				initial: 1,
				max: 0
			})
		).toBe(0);

		expect(
			validateMinMax(322, {
				type: 'number',
				initial: 123,
				min: 0,
				max: 228
			})
		).toBe(228);

		expect(
			validateMinMax(-15, {
				type: 'number',
				initial: -20,
				min: -25,
				max: -20
			})
		).toBe(-20);

		expect(
			validateMinMax(1, {
				type: 'number',
				initial: 1,
				min: -1,
				max: 0
			})
		).toBe(0);

		expect(
			validateMinMax(300, {
				type: 'number',
				initial: 300,
				max: 200
			})
		).toBe(200);
	});
});
