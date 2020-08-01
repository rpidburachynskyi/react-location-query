import { InitialExtendValuesWrappers } from '../../../types/Initial/Wrapper';

const sortByIndex = (defaultValuesWrappers: InitialExtendValuesWrappers) => (
	a: string,
	b: string
) => {
	const indexA = defaultValuesWrappers[a];
	const indexB = defaultValuesWrappers[b];
	if (!indexA || !indexB) return 0;

	return indexA.index - indexB.index;
};

export default sortByIndex;
