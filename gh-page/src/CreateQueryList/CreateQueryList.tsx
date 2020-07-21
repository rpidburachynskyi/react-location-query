import React, { useEffect, useState } from 'react';
import { inject, observer, Observer } from 'mobx-react';
import { QueryItems } from '../mobx/models/QueryItems';
import { List } from 'antd';
import CreateQueryListItem from './CreateQueryListItem';
import {
	useLocationQueryExtend,
	setOptions,
	useLocationQuery
} from 'react-location-query';
setOptions({
	sortingOptions: {
		sortBy: 'index',
		sortOrder: 'asc'
	}
});
interface Props {
	queryItems?: QueryItems;
}

const CreateQueryList = ({ queryItems }: Props) => {
	const [defaultValues, setDefaultValues] = useState({});
	const {} = useLocationQueryExtend(defaultValues);

	useEffect(() => {
		const newDefaultValues: any = {};

		queryItems!.items.forEach((item) => {
			newDefaultValues[item.name] = {
				type: item.type,
				initial: item.initial,
				hideIfInitial: item.hideIfInitial,
				replaceValueWhenParsedError: item.replaceValueWhenParsedError,
				onParsedError: item.onParsedError
			};
		});
		setDefaultValues(newDefaultValues);
	}, [JSON.stringify(queryItems!.items)]);
	return (
		<List
			dataSource={queryItems!.items}
			renderItem={(item) => <CreateQueryListItem item={item} />}
		/>
	);
};

export default inject('queryItems')(observer(CreateQueryList));
