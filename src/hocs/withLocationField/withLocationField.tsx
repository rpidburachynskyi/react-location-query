import React, { useState } from 'react';
import { useLocationField } from '../..';
import {
	InitialExtendObjectArrayBoolean,
	InitialExtendObjectArrayNumber,
	InitialExtendObjectArrayString
} from '../../types/Initial/Array';
import { InitialExtendObjectBoolean } from '../../types/Initial/Boolean';
import { InitialExtendObjectJson } from '../../types/Initial/Json';
import { InitialExtendObjectNumber } from '../../types/Initial/Number';
import { InitialExtendObjectString } from '../../types/Initial/String';

function withLocationField(
	name: string,
	value?: InitialExtendObjectString | string,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value?: InitialExtendObjectNumber | number,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value?: InitialExtendObjectBoolean | boolean,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value?: InitialExtendObjectJson | object,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value?: InitialExtendObjectArrayBoolean,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value?: InitialExtendObjectArrayNumber,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value?: InitialExtendObjectArrayString,
	fieldName?: string,
	setFieldName?: string
): any;

function withLocationField(
	name: string,
	value: any,
	fieldName?: string,
	setFieldName?: string
) {
	return (WrapperComponent: any) => (props: any) => {
		useState();
		const [_value, _setValue] = useLocationField(name, value);

		const _fieldName = fieldName || name;
		const _setFieldName =
			setFieldName || `set${name[0].toUpperCase()}${name.substring(1)}`;

		return (
			<WrapperComponent
				{...props}
				{...{
					[_fieldName]: _value,
					[_setFieldName]: _setValue
				}}
			/>
		);
	};
}
export default withLocationField;
