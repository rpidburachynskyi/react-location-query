import QueryString from 'qs';

const acceptOptions = (query, options) => {
    if (!options) return query;

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