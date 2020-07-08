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
			</Card>
		</List.Item>
	);
};

export default observer(CreateQueryListItem);
