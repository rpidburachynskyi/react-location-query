import React, { useState } from 'react';
import { Button, Typography, Row, Col } from 'antd';
import CreateQueryList from './CreateQueryList';
import { inject, observer } from 'mobx-react';
import { QueryItems } from './mobx/models/QueryItems';
import AddQueryItemDialog from './AddQueryItemDialog';
import QueryList from './QueryList';

interface Props {
	queryItems?: QueryItems;
}

const App = ({ queryItems }: Props) => {
	const [addQueryDialogVisible, setAddQueryDialogVisible] = useState(false);

	return (
		<div>
			<Typography.Title>React hook - useLocationQuery</Typography.Title>
			<Row gutter={[8, 8]}>
				<Col span={12}>
					<CreateQueryList />
					<Button onClick={() => setAddQueryDialogVisible(true)}>
						Add query item
					</Button>
					{addQueryDialogVisible && (
						<AddQueryItemDialog
							onClose={() => setAddQueryDialogVisible(false)}
						/>
					)}
				</Col>
				<Col span={12}>
					<QueryList />
				</Col>
			</Row>
		</div>
	);
};

export default inject('queryItems')(observer(App));
