import { useLocationQuery } from '.';
import { useHistory } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
	useHistory: jest.fn()
}));

jest.mock('react', () => ({
	useEffect: (a: Function) => {
		a();
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
				default: 'Rostyslav'
			}
		});

		expect(query).toEqual({ name: 'Rostyslav' });
		expect(useHistory).toBeCalledTimes(1);
		expect(replaceMock).toBeCalledTimes(1);
		expect(replaceMock).toBeCalledWith(
			`${location.pathname}?name=Rostyslav`
		);
	});
	it('with hideIfDefault', () => {
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
				default: 'Rostyslav',
				hideIfDefault: true
			}
		});

		expect(query).toEqual({ name: 'Rostyslav' });
		expect(useHistory).toBeCalledTimes(1);
		expect(replaceMock).toBeCalledTimes(1);
		expect(replaceMock).toBeCalledWith(location.pathname);
	});
	it('with many types', () => {
		const replaceMock = jest.fn(
			(query: string) =>
				(location.search = query.substring(location.pathname.length))
		);
		const location = {
			search: '?name=Rostyslav',
			pathname: '/'
		};
		// @ts-ignore
		useHistory.mockReturnValueOnce({ replace: replaceMock, location });

		const { query, setQueryField } = useLocationQuery({
			name: {
				type: 'string',
				default: 'Rostyslav'
			},
			age: {
				type: 'number',
				default: 19
			},
			married: {
				type: 'boolean',
				default: false
			}
		});

		expect(query).toEqual({ name: 'Rostyslav', age: 19, married: false });
		expect(useHistory).toBeCalledTimes(1);
		expect(replaceMock).toBeCalledTimes(1);
		expect(replaceMock).toBeCalledWith(
			`${location.pathname}?name=Rostyslav&age=19&married=false`
		);

		setQueryField('name', 'Rostik');

		expect(replaceMock).toBeCalledWith(
			`${location.pathname}?name=Rostik&age=19&married=false`
		);

		setQueryField('name', '');

		expect(replaceMock).toBeCalledWith(
			`${location.pathname}?name=&age=19&married=false`
		);
	});
});
