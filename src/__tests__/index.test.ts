import { useLocationQuery } from '../';
import { useHistory } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
	useHistory: jest.fn(),
	useLocation: jest.fn()
}));

jest.mock('react', () => ({
	useEffect: (a: Function) => {
		a();
	},
	useState: (value: number) => {
		return [value, () => {}];
	}
}));

describe('useLocationQuery', () => {
	beforeEach(() => {
		// @ts-ignore
		useHistory.mockReset();
	});
	it('default', () => {
		const replaceMock = jest.fn();
		const location = {
			search: '?name=Rostyslav',
			pathname: '/'
		};
		// @ts-ignore
		useHistory.mockReturnValueOnce({ replace: replaceMock, location });

		const { query } = useLocationQuery({
			name: {
				type: 'string',
				initial: 'Rostyslav'
			}
		});

		expect(query).toEqual({ name: 'Rostyslav' });
		expect(useHistory).toBeCalledTimes(1);
	});
	it('with hideIfInitial', () => {
		const replaceMock = jest.fn();
		const location = {
			search: '?name=Rostyslav',
			pathname: '/'
		};
		// @ts-ignore
		useHistory.mockReturnValueOnce({ replace: replaceMock, location });

		const { query } = useLocationQuery({
			name: {
				type: 'string',
				initial: 'Rostyslav',
				hideIfInitial: true
			}
		});

		expect(query).toEqual({ name: 'Rostyslav' });
		expect(useHistory).toBeCalledTimes(1);
	});
	it('with many types', () => {
		const replaceMock = jest.fn(
			(query: string) =>
				(location.search = query.substring(location.pathname.length))
		);
		const location = {
			search: '',
			pathname: '/'
		};
		// @ts-ignore
		useHistory.mockReturnValueOnce({ replace: replaceMock, location });

		const { query, setQueryField } = useLocationQuery({
			name: {
				type: 'string',
				initial: 'Rostyslav'
			},
			age: {
				type: 'number',
				initial: 19
			},
			married: {
				type: 'boolean',
				initial: false
			}
		});

		expect(query).toEqual({ name: 'Rostyslav', age: 19, married: false });
		expect(useHistory).toBeCalledTimes(1);

		setQueryField('name', 'Rostik');

		expect(replaceMock).toBeCalledWith(
			`${location.pathname}?name=Rostik&age=19&married=false`
		);
	});
});
