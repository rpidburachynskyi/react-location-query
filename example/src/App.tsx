import React from 'react';
import { useLocationQuery } from 'react-use-location-query';

const App = () => {
	const { query, setQueryField } = useLocationQuery({
		edit: {
			type: 'number',
			default: 123,
			hideIfDefault: true
		}
	});
	console.log(query);
	return (
		<div>
			{query.name !== '' && <FirstComponent />}
			<button onClick={() => setQueryField('edit', '123123213')}>
				Click
			</button>
		</div>
	);
};

const FirstComponent = () => {
	const { setQueryField } = useLocationQuery({ name: 'q' });
	return (
		<div>
			<button onClick={() => setQueryField('edit', '123')}>Close</button>
		</div>
	);
};

export default App;

/**import React, { useState } from 'react';
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
			<Row gutter={[8, 8]}>
				<Col span={12}>
					<QueryList />
				</Col>
			</Row>
		</div>
	);
};

export default inject('queryItems')(observer(App));
 */
