import React from 'react';
import { inject, observer } from 'mobx-react';
import { QueryItems } from '../mobx/models/QueryItems';
import { List } from 'antd';
import CreateQueryListItem from './CreateQueryListItem';
import { useLocationQuery } from 'react-use-location-query';

interface Props {
	queryItems?: QueryItems;
}

const CreateQueryList = ({ queryItems }: Props) => {
	const {} = useLocationQuery({
		name: {
			type: 'string',
			default: 'Rostyslav',
			hideIfDefault: true
		}
	});
	return (
		<List
			dataSource={queryItems!.items}
			renderItem={(item) => <CreateQueryListItem item={item} />}
		/>
	);
};

export default inject('queryItems')(observer(CreateQueryList));
