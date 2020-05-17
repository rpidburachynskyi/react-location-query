import QueryString from 'qs';

const hideFalseValues = (values) => {
    const keys = Object.keys(values);
    for (let i = 0; i < keys.length; i++) {
        const value = values[keys[i]];
        if (
            value === "false" ||
            value === false ||
            value === "" ||
            value === null
        ) {
            values[keys[i]] = undefined;
        }
    }
}

const acceptOptions = (query, options) => {
    if (!options) return query;

}

export const parse = (query, options) => {
    const search = query.substring(1);

    let result = QueryString.parse(search);

    acceptOptions(result, options);

    return result;
}

export const stringify = (values, options) => {
    const _values = values;
    if (options.hideFalseValues) hideFalseValues(_values);

    return QueryString.stringify(_values);
}