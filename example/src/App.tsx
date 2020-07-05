import React from 'react';
import { useLocationQuery } from 'react-use-location-query';
import { useLocation } from 'react-router-dom';

const App = () => {
	const { query, setQueryField } = useLocationQuery({
		name: {
			type: 'string',
			default: 'qwee',
			hideIfDefault: true
		},
		age: {
			type: 'number',
			default: 19,
			hideIfDefault: true
		},
		visible: {
			type: 'boolean',
			default: false,
			hideIfDefault: true
		},
		tab: 'first'
	});
	useLocation();
	return (
		<div>
			{query.tab === 'first' && <FirstComponent />}
			{query.tab === 'second' && <SecondComponent />}
			<button
				onClick={() =>
					setQueryField(
						'tab',
						query.tab === 'first' ? 'second' : 'first'
					)
				}
			>
				Click
			</button>
		</div>
	);
};

const FirstComponent = () => {
	const { query } = useLocationQuery({
		surname: {
			type: 'string',
			default: 'sur',
			hideIfDefault: true
		}
	});
	return (
		<div>
			<div>Surname: {query.surname}</div>
		</div>
	);
};

const SecondComponent = () => {
	const { query, fullQuery } = useLocationQuery({
		lastname: {
			type: 'string',
			default: 'last'
		}
	});
	console.log(fullQuery);
	return (
		<div>
			<div>Lastname: {query.lastname}</div>
		</div>
	);
};
export default App;
