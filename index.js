import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import QueryString from 'qs';
import processOptions from './processOptions';

let _values = {};
const getValue = () => _values;

const acceptProcessOptions = processOptions(getValue);

const linkDefaultValues = (history, defaultValues) => {
    compareAndJoinDefaultValuesWithValues(defaultValues);
    setQueryPath(history);
}

const setQueryPath = (history) => {
    const queryStr = QueryString.stringify(_values);
    history.replace(`${history.location.pathname}?${queryStr}`);
}

const setQuery = (history, query) => {
    _values = ({ ..._values, ...query });
    setQueryPath(history);
}

const unlinkDefaultValues = (history, defaultValues) => {
    const keys = Object.keys(defaultValues);
    for (let i = 0; i < keys.length; i++)
        _values[keys[i]] = undefined;
    setQueryPath(history);
}

const compareAndJoinLocationValuesWithValues = (defaultValues) => {
    const keys = Object.keys(defaultValues);
    for (let i = 0; i < keys.length; i++)
        _values[keys[i]] = defaultValues[keys[i]];
}

const compareAndJoinDefaultValuesWithValues = (defaultValues) => {
    const keys = Object.keys(defaultValues);
    for (let i = 0; i < keys.length; i++)
        if (_values[keys[i]] === undefined) {
            _values[keys[i]] = defaultValues[keys[i]];
        }
}

const useLocationQuery = (defaultValues, options) => {
    const history = useHistory();
    const location = useLocation();

    const { search } = location;

    compareAndJoinDefaultValuesWithValues(defaultValues);
    compareAndJoinLocationValuesWithValues(QueryString.parse(search.substring(1)));

    useEffect(() => {
        linkDefaultValues(history, defaultValues);
        return () => unlinkDefaultValues(history, defaultValues);
    }, []);

    const _setQuery = (changes) => {
        setQuery(history, changes);
    }

    let query = acceptProcessOptions(options);

    return {
        query,
        setQuery: _setQuery,
    }
};

export default useLocationQuery;