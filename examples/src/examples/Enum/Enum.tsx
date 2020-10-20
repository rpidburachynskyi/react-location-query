import React from 'react';
import { useLocationField, useLocationFieldT } from 'react-location-query';

const Enum = () => {
	const [q, setType] = useLocationField('type', {
		type: 'string',
		initial: 'first',
		enum: {
			array: ['first', 'second', 'third', 'fourth', 'fifth'],
			onNonEnum: () => 'first'
		}
	});

	const [type] = useLocationFieldT<string>('type');

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
