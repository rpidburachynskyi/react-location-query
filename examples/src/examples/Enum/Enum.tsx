import React from 'react';
import { useLocationField } from 'react-location-query';

const Enum = () => {
	const [type, setType] = useLocationField('type', {
		type: 'string',
		initial: 'asd',
		enum: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'],
		onParsedEnumError: () => 'a'
	});
	return (
		<div>
			<div>Current type: {type}</div>
			<div>
				<h2>Allow types</h2>
				<div>
					<button onClick={() => setType('first')}>
						set 'first'
					</button>
				</div>
			</div>
		</div>
	);
};

export default Enum;
