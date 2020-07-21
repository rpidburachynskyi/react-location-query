import React from 'react';
import { useLocationField } from 'react-location-query';

const Medium = () => {
	const [name, setName] = useLocationField<string>(
		'name',
		'Rostyslav' as any
	);
	const [age, setAge] = useLocationField<number>('age', {
		type: 'number',
		initial: 19,
		onParsedError: () => 0
	});
	const [married, setMarried] = useLocationField<boolean>(
		'married',
		false as any
	);
	return (
		<div>
			<div>
				<label>Name: </label>
				<input value={name} onChange={(e) => setName(e.target.value)} />
			</div>
			<div>
				<label>Age: </label>
				<input value={age} onChange={(e) => setAge(+e.target.value)} />
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
