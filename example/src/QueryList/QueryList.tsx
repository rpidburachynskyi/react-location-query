import React from 'react';
import { List, Input, Form } from 'antd';
import { useLocationQuery } from 'react-location-query';
import { observer } from 'mobx-react';

import classes from './QueryList.module.css';

const QueryList = () => {
	const { fullQuery, setQueryField } = useLocationQuery({});
	return (
		<List
			dataSource={Object.keys(fullQuery).map((key) => ({
				name: key,
				value: fullQuery[key]
			}))}
			renderItem={(item) => (
				<List.Item key={item.name}>
					<Form.Item style={{ width: '100%' }} label={item.name}>
						<Input
							value={item.value.toString()}
							onChange={(e) =>
								setQueryField(item.name, e.target.value as any)
							}
						/>
					</Form.Item>
				</List.Item>
			)}
		/>
	);
};

export default observer(QueryList);
