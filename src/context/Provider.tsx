import React, { useEffect, useContext } from 'react';
import Context, { Context as ContextType } from './context';
import { useHistory, useLocation } from 'react-router-dom';
import { setHistory } from '../stores/store/store';
import { calculateLocationPath } from '../utils/locationController/locationController';
import readQuery from '../utils/locationController/readQuery';
import { ActionOnChange } from '../types/ActionOnChange';
import { SortOptions } from '../stores/options/types/SortOptions';
import { DefaultOptions } from '../stores/options/types/DefaultOptions';
import Options from '../types/Options';

interface Props {
	children: any;

	sortOptions?: SortOptions;
	defaultOptions?: DefaultOptions;
	options?: Options;
}

const Provider = ({
	children,
	options,
	defaultOptions,
	sortOptions
}: Props) => {
	const history = useHistory();
	useLocation();

	setHistory(history);

	const newOptions: Options = {
		crypto: false,
		removeUnusedQueryFields: true,
		...options
	};

	const newDefaultOptions: DefaultOptions = {
		hideIfDefault: false,
		replaceValueWhenParsedError: true,
		...defaultOptions
	};

	const newSortOptions: SortOptions = {
		sortBy: 'order',
		sortOrder: 'asc',
		...sortOptions
	};

	const context: ContextType = {
		query: readQuery(newOptions),
		initialValuesWrappers: [],
		options: newOptions,
		defaultOptions: newDefaultOptions,
		sortOptions: newSortOptions
	};

	return (
		<Context.Provider value={context}>
			<InsideProvider>{children}</InsideProvider>
		</Context.Provider>
	);
};

interface InsideProps {
	children: any;
}

const InsideProvider = ({ children }: InsideProps) => {
	const context = useContext(Context);
	useEffect(() => {
		calculateLocationPath(context, ActionOnChange.Replace);
	});
	return children;
};

export default Provider;
