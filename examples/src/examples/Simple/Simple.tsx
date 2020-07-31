import React from 'react';
import { useLocationField } from 'react-location-query';

const names = ['Rostyslav', 'Rostik', 'Rostya', 'kitsoRik'];

const Simple = () => {
	const [name, setName] = useLocationField('name', {
		type: 'string',
		initial: 'Rostyslav',
		validate: (a) => a
	});

	const changeNameRandomly = () => {
		const index = Math.floor(Math.random() * 5000) % names.length;
		setName(names[index]);
	};

	return (
		<div className='App'>
			<h1>Hello my current name is {name}</h1>
			<button onClick={changeNameRandomly}>Change name randomly</button>
		</div>
	);
};

export default Simple;
