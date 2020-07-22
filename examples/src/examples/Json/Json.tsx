import React, { useEffect, useState } from 'react';
import { useLocationField } from 'react-location-query';

const Json = () => {
	const [json, setJson] = useLocationField('data', {
		type: 'json',
		initial: {},
		onParsedError: () => {
			return { error: 'true' };
		}
	});

	const [objectValue, setObjectValue] = useState(JSON.stringify(json));

	useEffect(() => {
		let error = false;
		try {
			JSON.parse(objectValue);
		} catch (e) {
			error = true;
		}
		if (error) return;
		setJson(JSON.parse(objectValue));
	}, [objectValue]);

	let error = false;
	try {
		JSON.parse(objectValue);
	} catch (e) {
		error = true;
	}

	return (
		<div>
			<textarea
				style={{ outline: error ? '2px solid red' : '' }}
				cols={30}
				rows={10}
				value={objectValue}
				onChange={(e) => setObjectValue(e.target.value)}
			></textarea>
		</div>
	);
};

export default Json;
