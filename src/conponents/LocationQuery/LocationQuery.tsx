import { InitialObjectType } from '../../types/Initial/Initial';
import useLocationFields from '../../hooks/useLocationFields';
import { useContext } from 'react';
import Context from '../../context/context';

interface Props {
	values?: { [name: string]: InitialObjectType };
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
