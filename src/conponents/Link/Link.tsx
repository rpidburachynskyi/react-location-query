import React, { useContext } from 'react';
import { Link as RRDLink, LinkProps } from 'react-router-dom';
import { stringifyQuery } from '../../lib/utils/queryParser/queryParser';
import Context from '../../lib/context/context';

interface Props extends LinkProps {
	query: {
		[name: string]:
			| boolean
			| string
			| number
			| object
			| Array<boolean | string | number>;
	};
}

const Link = ({ to, query, ...props }: Props) => {
	const context = useContext(Context);
	const newTo = `${to}?${stringifyQuery(query, context.cryptoOptions)}`;
	return <RRDLink to={newTo} {...props} />;
};

export default Link;
