import React from 'react';
import { List, Input, Form } from 'antd';
import { useLocationQuery, useLocationQueryExtend } from 'react-location-query';
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
			renderItem={(item: any) => (
				<List.Item key={item.name}>
					<Form.Item style={{ width: '100%' }} label={item.name}>
						<Input
							value={
								typeof item.value === 'object'
									? JSON.stringify(item.value)
									: item.value.toString()
							}
							onChange={(e) =>
								setQueryField(item.name, e.target.value)
							}
						/>
					</Form.Item>
				</List.Item>
			)}
		/>
	);
};

export default observer(QueryList);
