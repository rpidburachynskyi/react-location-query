import React from 'react';
import { LocationQuery } from 'react-location-query';

const InsideComponent = () => {
	return (
		<LocationQuery values={{ age: 19 }}>
			{({ query: { age } }: any) => {
				return <div>{age}</div>;
			}}
		</LocationQuery>
	);
};

export default InsideComponent;
