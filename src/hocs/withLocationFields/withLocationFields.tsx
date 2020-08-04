import React, { useContext } from 'react';
import { useLocationFields } from '../..';
import { InitialObjectType } from '../../lib/types/Initial/Initial';
import Context from '../../lib/context/context';

type Values = {
	[name: string]: InitialObjectType | string | number | boolean;
};

function withLocationFields(
	values: Values,
	values_FieldName: string = 'values',
	setQueryField_FieldName = 'setQueryField'
) {
	return (WrapperComponent: any) => (props: any) => {
		const context = useContext(Context);

		if (!context) {
			throw new Error(
				'You must use withLocationFields inside BrowserLocationQuery'
			);
		}

		const { values: _values, setQueryField } = useLocationFields(values);

		return (
			<WrapperComponent
				{...props}
				{...{
					[values_FieldName]: _values,
					[setQueryField_FieldName]: setQueryField
				}}
			/>
		);
	};
}
export default withLocationFields;
