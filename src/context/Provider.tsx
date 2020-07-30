import React, { useEffect, useContext } from 'react';
import Context from './context';
import { useHistory, useLocation } from 'react-router-dom';
import { setHistory } from '../stores/store/store';
import readQuery from '../utils/queryParser/readQuery';
import { calculateLocationPath } from '../utils/locationController/locationController';

interface Props {
	children: any;
}

const Provider = ({ children }: Props) => {
	const history = useHistory();
	useLocation();

	setHistory(history);

	const currentQuery = readQuery();
	return (
		<Context.Provider value={currentQuery}>
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
		calculateLocationPath(context);
	});
	return children;
};

export default Provider;
