import { useState, useEffect } from 'react';

let currentIndex = 0;

export const useIndex = () => {
	const [index] = useState(currentIndex++);

	useEffect(() => {
		return () => {
			currentIndex--;
		};
	}, []);

	return index;
};
