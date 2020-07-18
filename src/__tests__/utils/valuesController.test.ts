import { InitialExtendValues } from '../../types/Initial/Initial';
import {
	addInitialValues,
	getInitialValues
} from '../../utils/valuesController/valuesController';

describe('valuesController.test', () => {
	it('addInitialValues', () => {
		const initialValues1: InitialExtendValues = {
			name: { type: 'string', initial: '' }
		};

		addInitialValues(initialValues1, 0);
		expect(getInitialValues()).toEqual(initialValues1);

		const initialValues2: InitialExtendValues = {
			age: { type: 'number', initial: 19 }
		};

		addInitialValues(initialValues2, 1);
		expect(getInitialValues()).toEqual({
			...initialValues1,
			...initialValues2
		});
	});
});
