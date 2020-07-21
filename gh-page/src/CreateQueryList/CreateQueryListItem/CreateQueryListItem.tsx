import React from 'react';
import { List, Card, Form, Input, Checkbox } from 'antd';
import { QueryItem } from '../../mobx/models/QueryItem';
import { observer } from 'mobx-react';

interface Props {
	item: QueryItem;
}

const CreateQueryListItem = ({ item }: Props) => {
	return (
		<List.Item>
			<Card title={item.name} style={{ width: '100%' }}>
				<Form.Item label='Name'>
					<Input
						value={item.name}
						onChange={(e) => item.setName(e.target.value)}
					/>
				</Form.Item>
				<Form.Item label='Initial value'>
					<Input
						value={item.initial.toString()}
						onChange={(e) => item.setInitial(e.target.value)}
					/>
				</Form.Item>
				<Form.Item label='Hide if default'>
					<Checkbox
						checked={item.hideIfInitial}
						onChange={(e) =>
							item.setHideIfInitial(e.target.checked)
						}
					>
						Hide if initial
					</Checkbox>
				</Form.Item>
				<Form.Item label='On parsed error'>
					<Input
						value={item.onParsedError.toString()}
						onChange={(e) =>
							item.setOnParsedError(() => {
								return 123;
							})
						}
					/>
				</Form.Item>
				<Form.Item label='Replace when parsed error'>
					<Checkbox
						checked={item.replaceValueWhenParsedError}
						onChange={(e) =>
							item.setReplaceValueWhenParsedError(
								e.target.checked
							)
						}
					>
						Replace when parsed error
					</Checkbox>
				</Form.Item>
			</Card>
		</List.Item>
	);
};

export default observer(CreateQueryListItem);
