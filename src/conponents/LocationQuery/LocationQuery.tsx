import { InitialObjectType } from '../../lib/types/Initial/Initial';
import useLocationFields from '../../hooks/useLocationFields';
import { useContext } from 'react';
import Context from '../../lib/context/context';

type Values = {
	[name: string]: InitialObjectType | string | number | boolean;
};

interface Props {
	values?: Values;
	children: (v: {
		query: object;
		setQueryField: (
			name: string,
			value: any,
			actionOnChange?: 'Push' | 'Replace'
		) => void;
	}) => JSX.Element;
}

const LocationQuery = ({ values = {}, children }: Props) => {
	const { setQueryField } = useLocationFields(values);
	const context = useContext(Context);

	return children({
		query: context.query,
		setQueryField
	});
};

export default LocationQuery;
