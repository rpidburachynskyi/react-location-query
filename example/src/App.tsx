import React, { useState } from 'react';
import { useLocationQuery } from 'react-use-location-query';
import { Button, Typography } from 'antd';
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
			<div>
				<div>
					<CreateQueryList />
					<Button onClick={() => setAddQueryDialogVisible(true)}>
						Add query item
					</Button>
					{addQueryDialogVisible && (
						<AddQueryItemDialog
							onClose={() => setAddQueryDialogVisible(false)}
						/>
					)}
				</div>
				<div>
					<QueryList />
				</div>
			</div>
		</div>
	);
};

export default inject('queryItems')(observer(App));
