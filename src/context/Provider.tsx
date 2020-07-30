import React from 'react';
import Context from './context';
import { useHistory, useLocation } from 'react-router-dom';
import { setHistory } from '../stores/store/store';

interface Props {
	children: any;
}

const obj = {};

const Provider = ({ children }: Props) => {
	const history = useHistory();
	useLocation();

	setHistory(history);

	return <Context.Provider value={obj}>{children}</Context.Provider>;
};

export default Provider;
