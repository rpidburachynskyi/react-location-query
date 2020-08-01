import React, { useEffect, useContext } from 'react';
import Context, { Context as ContextType } from '../../lib/context/context';
import { useHistory, useLocation } from 'react-router-dom';
import { SortOptions } from '../../lib/stores/options/types/SortOptions';
import { DefaultOptions } from '../../lib/stores/options/types/DefaultOptions';
import Options from '../../lib/types/Options';
import { setHistory } from '../../lib/stores/store/store';
import readQuery from '../../lib/utils/locationController/readQuery';
import { calculateLocationPath } from '../../lib/utils/locationController/locationController';

interface Props {
	children: any;

	sortOptions?: SortOptions;
	defaultOptions?: DefaultOptions;
	options?: Options;
}

const BrowserLocationQuery = ({
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
		calculateLocationPath(context, 'Replace');
	});
	return children;
};

export default BrowserLocationQuery;
