import React from 'react';
import { useLocationFields } from '../..';
import { InitialObjectType } from '../../types/Initial/Initial';

type Values = {
	[name: string]: InitialObjectType | string | number | boolean;
};

function withLocationField(
	values: Values,
	values_FieldName: string = 'values',
	setQueryField_FieldName = 'setQueryField'
) {
	return (WrapperComponent: any) => (props: any) => {
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
export default withLocationField;
