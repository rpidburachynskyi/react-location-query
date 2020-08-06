import React from 'react';
import { useLocationField } from 'react-location-query';

const names = ['Rostyslav', 'Rostik', 'Rostya', 'kitsoRik'];

const MyArray = () => {
	const [selectedPages, setSelectedPages] = useLocationField(
		'selectedPages',
		{
			type: 'array',
			arrayType: 'number',
			initial: []
		}
	);

	return (
		<div className='App'>
			{Array.from({ length: 25 }).map((v, page) => {
				const selected = selectedPages.includes(page);
				const onClick = () => {
					if (selected) {
						setSelectedPages(
							selectedPages.filter((p) => p !== page)
						);
					} else {
						setSelectedPages([...selectedPages, page]);
					}
				};

				return (
					<div>
						<button onClick={onClick}>
							{page} -{' '}
							{selected
								? 'Selected, click to unselect'
								: 'Not selected, click to select'}
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default MyArray;
