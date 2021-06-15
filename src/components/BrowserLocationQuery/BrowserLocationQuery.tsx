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
import { unmarkAllInitialValuesWrappers } from '../../lib/utils/valuesController/valuesController/unmarkAllInitialValuesWrappers';
import { deleteUnmarkedWrappers } from '../../lib/utils/valuesController/valuesController/deleteUnmarkedWrappers';

interface Props {
	children: any;

	sortOptions?: SortOptions;
	defaultOptions?: DefaultOptions;
	rules?: Rules;
}

let oldContext: ContextType;

const BrowserLocationQuery = ({
	children,
	rules,
	defaultOptions,
	sortOptions
}: Props) => {
	const history = useHistory();
	useLocation();

	setHistory(history);

	const newDefaultOptions: DefaultOptions = {
		hideIfDefault: false,
		actionOnChange: 'Push',
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

	const newRules: Rules = {
		removeUnusedQueryFields: true,
		...rules
	};

	const context: ContextType =
		oldContext && !oldContext.isCleaned
			? oldContext
			: {
					isCleaned: false,
					query: readQuery(newCryptoOptions),
					initialValuesWrappers: {},
					defaultOptions: newDefaultOptions,
					sortOptions: newSortOptions,
					cryptoOptions: newCryptoOptions,
					rules: newRules
			  };

	unmarkAllInitialValuesWrappers(context);

	oldContext = context;

	useEffect(() => {
		deleteUnmarkedWrappers(context);
	});

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
