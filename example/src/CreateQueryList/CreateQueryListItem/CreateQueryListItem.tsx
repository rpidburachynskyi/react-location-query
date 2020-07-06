import React from 'react';
import { List } from 'antd';
import { QueryItem } from '../../mobx/models/QueryItem';

interface Props {
	item: QueryItem;
}

const CreateQueryListItem = ({ item }: Props) => {
	return <List.Item>{item.name}</List.Item>;
};

export default CreateQueryListItem;
