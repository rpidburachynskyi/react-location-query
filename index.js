import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import processOptions from './processOptions';
import { parse, stringify } from './queryParser';

let _values = {};
const getValue = () => _values;

const acceptProcessOptions = processOptions(getValue);

const linkDefaultValues = (history, defaultValues, options) => {
    compareAndJoinDefaultValuesWithValues(defaultValues);
    setQueryPath(history, options);
}

const setQueryPath = (history, options) => {
    const queryStr = stringify(_values, options);
    history.replace(`${history.location.pathname}?${queryStr}`);
}

const setQuery = (history, query, options) => {
    _values = ({ ..._values, ...query });
    setQueryPath(history, options);
}

const unlinkDefaultValues = (history, defaultValues, options) => {
    const keys = Object.keys(defaultValues);
    for (let i = 0; i < keys.length; i++)
        _values[keys[i]] = undefined;
    setQueryPath(history, options);
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

const useLocationQuery = (defaultValues = {}, options = {
    parseBoolean: true,
    parseNumber: true,

    hideFalseValues: false
}) => {
    const history = useHistory();
    const { search } = useLocation();

    compareAndJoinDefaultValuesWithValues(defaultValues);
    compareAndJoinLocationValuesWithValues(parse(search, options));

    useEffect(() => {
        linkDefaultValues(history, defaultValues, options);
        return () => unlinkDefaultValues(history, defaultValues, options);
    }, []);

    useEffect(() => {
        if (search === "") {
            setQueryPath(history);
        }
    }, [search]);

    const _setQuery = (changes) => {
        setQuery(history, changes, options);
    }

    let query = acceptProcessOptions(options);

    return {
        query,
        setQuery: _setQuery,
    }
};

export default useLocationQuery;