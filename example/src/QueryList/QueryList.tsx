import React from 'react';
import { List, Input } from 'antd';
import { useLocationQuery } from 'react-use-location-query';

const QueryList = () => {
	const { fullQuery, setQueryField } = useLocationQuery({});
	console.log(fullQuery);
	return (
		<List
			dataSource={Object.keys(fullQuery).map((key) => ({
				name: key,
				value: fullQuery[key]
			}))}
			renderItem={(item) => (
				<List.Item key={item.name}>
					<Input
						value={item.value.toString()}
						onChange={(e) =>
							setQueryField(item.name, e.target.value)
						}
					/>
				</List.Item>
			)}
		/>
	);
};

export default QueryList;
