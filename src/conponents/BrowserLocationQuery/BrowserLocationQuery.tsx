import React, { useEffect, useContext } from 'react';
import Context, { Context as ContextType } from '../../lib/context/context';
import { useHistory, useLocation } from 'react-router-dom';
import { SortOptions } from '../../lib/stores/options/types/SortOptions';
import { DefaultOptions } from '../../lib/stores/options/types/DefaultOptions';
import { setHistory } from '../../lib/stores/store/store';
import readQuery from '../../lib/utils/locationController/readQuery';
import { calculateLocationPath } from '../../lib/utils/locationController/locationController';
import CryptoOptions from '../../lib/stores/options/types/CryptoOptions/CryptoOptions';
import { Rules } from '../../lib/stores/options/types/Rules';

interface Props {
	children: any;

	sortOptions?: SortOptions;
	defaultOptions?: DefaultOptions;
	rules?: Rules;
}

const BrowserLocationQuery = ({
	children,
	rules,
	defaultOptions,
	sortOptions
}: Props) => {
	const history = useHistory();
	useLocation();

	setHistory(history);

	const newRules: Rules = {
		removeUnusedQueryFields: true,
		...rules
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

	const newCryptoOptions: CryptoOptions = {
		method: 'none',
		...crypto
	};

	const context: ContextType = {
		query: readQuery(newCryptoOptions),
		initialValuesWrappers: [],
		rules: newRules,
		defaultOptions: newDefaultOptions,
		sortOptions: newSortOptions,
		cryptoOptions: newCryptoOptions
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
