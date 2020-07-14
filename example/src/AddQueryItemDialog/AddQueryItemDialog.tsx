import React from 'react';

import { Modal, Form, Input, Select, Checkbox } from 'antd';
import { inject, observer } from 'mobx-react';
import { QueryItems } from '../mobx/models/QueryItems';
import { useFormik } from 'formik';

interface Props {
	queryItems?: QueryItems;
	onClose: Function;
}

const AddQueryItemDialog = ({ queryItems, onClose }: Props) => {
	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldTouched,
		setFieldValue,
		isValid,
		dirty
	} = useFormik({
		initialValues: {
			name: '',
			type: 'string',
			defaultValue: '',
			hideIfInitial: false,
			replaceValueWhenParsedError: false,
			onParsedError: () => {
				return 123;
			}
		},
		validate: ({ name }) => {
			const errors: any = {};

			if (name === '') errors.name = 'Name should be exists';
			else if (queryItems?.items.map((i) => i.name).includes(name))
				errors.name = 'Name is not unique';

			return errors;
		},
		onSubmit: () => {}
	});

	return (
		<Modal
			title='Basic Modal'
			visible={true}
			cancelText='Скасувати'
			onCancel={() => onClose()}
			okText='Додати'
			okButtonProps={{ disabled: !isValid || !dirty }}
			onOk={() => {
				queryItems!.addQueryItem(
					values.name,
					values.type as 'string' | 'number' | 'boolean',
					values.defaultValue,
					values.hideIfInitial,
					values.replaceValueWhenParsedError,
					values.onParsedError.toString()
				);
				onClose();
			}}
		>
			<Form layout='vertical' onSubmitCapture={handleSubmit}>
				<Form.Item
					label='Name'
					validateStatus={
						touched.name && errors.name ? 'error' : 'validating'
					}
					help={touched.name && errors.name}
				>
					<Input
						name='name'
						placeholder='Example: name'
						value={values.name}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Form.Item>
				<Form.Item
					label='Type'
					validateStatus={
						touched.type && errors.type ? 'error' : 'validating'
					}
					help={touched.type && errors.type}
				>
					<Select
						value={values.type}
						onChange={(value) => setFieldValue('type', value)}
						onBlur={() => setFieldTouched('type')}
					>
						<Select.Option value='string'>string</Select.Option>
						<Select.Option value='number'>number</Select.Option>
						<Select.Option value='boolean'>boolean</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item
					label='Default value'
					validateStatus={
						touched.defaultValue && errors.defaultValue
							? 'error'
							: 'validating'
					}
					help={touched.defaultValue && errors.defaultValue}
				>
					<Input
						name='defaultValue'
						placeholder='Example: Rostyslav'
						value={values.defaultValue}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Form.Item>
				<Checkbox
					checked={values.hideIfInitial}
					onChange={({ target: { checked } }) =>
						setFieldValue('hideIfInitial', checked)
					}
				>
					Hide if default?
				</Checkbox>
			</Form>
		</Modal>
	);
};

export default inject('queryItems')(observer(AddQueryItemDialog));
