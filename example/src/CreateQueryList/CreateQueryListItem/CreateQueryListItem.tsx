import React from 'react';
import { List, Card, Form, Input } from 'antd';
import { QueryItem } from '../../mobx/models/QueryItem';
import { observer } from 'mobx-react';

interface Props {
	item: QueryItem;
}

const CreateQueryListItem = ({ item }: Props) => {
	return (
		<List.Item>
			<Card title={item.name} style={{ width: '100%' }}>
				<Form.Item>
					<Input
						value={item.default.toString()}
						onChange={(e) => item.setDefault(e.target.value)}
					/>
				</Form.Item>
			</Card>
		</List.Item>
	);
};

export default observer(CreateQueryListItem);
