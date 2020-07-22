import React from 'react';
import { useHistoryPush } from 'react-location-query';

const WithPush = () => {
	const push = useHistoryPush();

	const pushToSimple = () => {
		push('/examples/simple', { name: 'Donald' });
	};

	const pushToMedium = () => {
		push('/examples/medium', { name: 'Donald', age: 25 });
	};

	return (
		<div>
			<div>
				<label>Go to simple</label>
				<button onClick={pushToSimple}>
					Push with: name = "Donald"
				</button>
			</div>
			<div>
				<label>Go to medium</label>
				<button onClick={pushToMedium}>
					Push with: name = "Donald", age = 25
				</button>
			</div>
		</div>
	);
};

export default WithPush;
