import QueryString from 'qs';

const parseArray = (query, options) => {
    const keys = Object.keys(query);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = query[key];
        if (/^\[.*\]$/.test(value))
            query[key] = JSON.parse(value);
    }
}

const acceptOptions = (query, options) => {
    if (!options) return query;

    parseArray(query, options);
}

export const parse = (query, options) => {
    const search = query.substring(1);

    let result = QueryString.parse(search);

    acceptOptions(result, options);

    return result;
}

export const stringify = (values) => {
    return QueryString.stringify(values);
}