import React, { useEffect, useState } from 'react';
import { Button, Typography, Row, Col } from 'antd';
import CreateQueryList from './CreateQueryList';
import { inject, observer } from 'mobx-react';
import { QueryItems } from './mobx/models/QueryItems';
import AddQueryItemDialog from './AddQueryItemDialog';
import QueryList from './QueryList';
import { setOptions, useLocationQueryExtend } from 'react-location-query';

setOptions({
	removeUnusedQueryFields: true
});

interface Props {
	queryItems?: QueryItems;
}

function App() {
	useLocationQueryExtend({});
	const [isIndex, setIsIndex] = useState(true);
	return (
		<div className='App'>
			{isIndex && <NonIndexComponent />}
			{!isIndex && <IndexComponent />}
			<button onClick={() => setIsIndex(!isIndex)}>
				Toggle indexes components
			</button>
		</div>
	);
}

const IndexComponent = () => {
	const {
		query: { name }
	} = useLocationQueryExtend({
		name: {
			type: 'string',
			initial: 'Rostyslav'
		}
	});

	return <h1>My index is {}</h1>;
};

const NonIndexComponent = () => {
	return <h1>I'm without index</h1>;
};

// const App = ({ queryItems }: Props) => {
// 	const [addQueryDialogVisible, setAddQueryDialogVisible] = useState(false);

// 	return (
// 		<div>
// 			<Typography.Title>React hook - useLocationQuery</Typography.Title>
// 			<Row gutter={[8, 8]}>
// 				<Col span={12}>
// 					<CreateQueryList />
// 					<Button onClick={() => setAddQueryDialogVisible(true)}>
// 						Add query item
// 					</Button>
// 					{addQueryDialogVisible && (
// 						<AddQueryItemDialog
// 							onClose={() => setAddQueryDialogVisible(false)}
// 						/>
// 					)}
// 				</Col>
// 				<Col span={12}>
// 					<QueryList />
// 				</Col>
// 			</Row>
// 		</div>
// 	);
// };

export default inject('queryItems')(observer(App));
