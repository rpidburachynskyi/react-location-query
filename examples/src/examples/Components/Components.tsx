import React from 'react';
import { LocationQuery } from 'react-location-query';
import InsideComponent from './InsideComponent';

const Components = () => {
	return (
		<LocationQuery values={{ name: 'Rostyslav' }}>
			{({ query: { name } }: any) => {
				return (
					<>
						<div>{name}</div>
						<InsideComponent />
					</>
				);
			}}
		</LocationQuery>
	);
};

export default Components;
