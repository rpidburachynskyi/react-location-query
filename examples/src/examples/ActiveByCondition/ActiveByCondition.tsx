import { Checkbox } from 'antd';
import React from 'react';
import { useLocationField, useLocationFieldT } from 'react-location-query';

const ActiveByCondition = () => {
	const [firstVisible, setFirstVisible] = useLocationField('firstVisible', {
		type: 'boolean',
		initial: true,
		hideIfInitial: true
	});
	return (
		<div>
			<label>Check to show name</label>
			<Checkbox
				checked={firstVisible}
				onChange={(e) => setFirstVisible(e.target.checked)}
			/>
			<IfTrue visible={firstVisible} />
			<IfFalse visible={!firstVisible} />
		</div>
	);
};

export default ActiveByCondition;

const IfTrue = ({ visible }: { visible: boolean }) => {
	const [name, setName] = useLocationField('name', {
		type: 'string',
		initial: 'Rostik',
		active: {
			isActive: visible,
			canChangeValue: false,
			storeValue: true
		}
	});

	if (!visible) return null;

	return (
		<div>
			True (name)
			<input value={name} onChange={(e) => setName(e.target.value)} />
		</div>
	);
};

const IfFalse = ({ visible }: { visible: boolean }) => {
	const [surname, setSurname] = useLocationField('surname', {
		type: 'string',
		initial: 'Pidburachynskyi',
		active: {
			isActive: visible,
			canChangeValue: false,
			storeValue: true
		}
	});

	if (!visible) return null;

	return (
		<div>
			False (surname)
			<input
				value={surname}
				onChange={(e) => setSurname(e.target.value)}
			/>
		</div>
	);
};
