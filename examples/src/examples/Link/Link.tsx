import React from 'react';
import { Link as QLink } from 'react-location-query';

const Link = () => {
	return (
		<>
			<h1>Links</h1>
			<ul>
				<li>
					<QLink to='/examples/simple' query={{ name: 'David' }}>
						Go to simple example with name - David
					</QLink>
				</li>
				<li>
					<QLink
						to='/examples/medium'
						query={{ name: 'David', age: 20 }}
					>
						Go to medium example with name - David, age - 20
					</QLink>
				</li>
				<li>
					<QLink
						to='/examples/json'
						query={{ data: { name: 'Rostyslav' } }}
					>
						Go to json example with data -{' '}
						{JSON.stringify({ name: 'Rostyslav' })}
					</QLink>
				</li>
				<li>
					<QLink
						to='/examples/array'
						query={{ selectedPages: [1, 2, 3, 5, 7, 11] }}
					>
						Go to array example with selectedPages - [1,2,3,5,7,11]
					</QLink>
				</li>
			</ul>
		</>
	);
};

export default Link;
