import React from 'react';
import { useLocationQuery } from 'react-use-location-query';

const App = () => {
	const { query, setQueryField } = useLocationQuery(
		{
			edit: {
				type: 'string',
				default: '',
				hideIfDefault: true
			}
		},
		'App'
	);
	return (
		<div>
			{query.edit !== '' && <FirstComponent />}
			<button onClick={() => setQueryField('edit', '123123213')}>
				Click
			</button>
		</div>
	);
};

const FirstComponent = () => {
	const { setQueryField } = useLocationQuery({ name: 'Rostyslav' }, 'First');
	return (
		<div>
			<button onClick={() => setQueryField('edit', '')}>Close</button>
		</div>
	);
};

export default App;
