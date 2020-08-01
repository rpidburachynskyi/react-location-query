import React from 'react';
import { useLocationField } from 'react-location-query';

const Medium = () => {
	const [name, setName] = useLocationField('name', 'Rostyslav');
	const [age, setAge] = useLocationField('age', {
		// @ts-ignore
		type: 'number',
		// @ts-ignore
		initial: 19,
		// @ts-ignore
		enum: [1, 2, 3, 19],
		// @ts-ignore
		// @ts-ignore
		onParsedEnumError: () => 2,
		// @ts-ignore
		onParsedError: () => 0
	});
	const [married, setMarried] = useLocationField('married', false);
	return (
		<div>
			<div>
				<label>Name: </label>
				<input value={name} onChange={(e) => setName(e.target.value)} />
			</div>
			<div>
				<label>Age: </label>
				<input
					value={age}
					onChange={(e) => (setAge as any)(+e.target.value)}
				/>
			</div>
			<div>
				<label>Married: </label>
				<input
					checked={married}
					type='checkbox'
					onChange={(e) => setMarried(e.target.checked)}
				/>
			</div>
		</div>
	);
};

export default Medium;
