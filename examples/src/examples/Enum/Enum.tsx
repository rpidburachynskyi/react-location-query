import React from 'react';
import { useLocationField } from 'react-location-query';

const Enum = () => {
	const [, setType] = useLocationField('type', {
		type: 'string',
		initial: 'first',
		enum: ['first', 'second', 'third', 'fourth', 'fifth'],
		onParsedEnumError: () => 'first'
	});

	const [type] = useLocationField('type');

	return (
		<div>
			<div>Current type: {type}</div>
			<div>
				<h2>Allow types</h2>
				<div>
					<button onClick={() => setType('first')}>
						set 'first'
					</button>
					<button onClick={() => setType('second')}>
						set 'second'
					</button>
					<button onClick={() => setType('third')}>
						set 'third'
					</button>
					<button onClick={() => setType('fourth')}>
						set 'fourth'
					</button>
					<button onClick={() => setType('fifth')}>
						set 'fifth'
					</button>
				</div>
			</div>
			<div>
				<h2>Not allow types (will replace to 'first')</h2>
				<div>
					<button onClick={() => setType('sixth')}>
						set 'sixth'
					</button>
				</div>
			</div>
		</div>
	);
};

export default Enum;
