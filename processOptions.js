const replaceBoolean = (value) => {
    if (value === "true") return true;
    else if (value === "false") return false;
    return value;
}

const replaceNumber = (value) => {
    if (/^-?\d*\.?\d+$/.test(value)) return +value;
    return value;
}

const recursiveReplace = (query, options) => {
    const keys = Object.keys(query);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = query[key];

        if (options.parseNumber) query[key] = replaceNumber(value);
        if (options.parseBoolean) query[key] = replaceBoolean(value);

        if (typeof value === 'object') query[key] = recursiveReplace(value, options);
        if (Array.isArray(value)) query[key] = recursiveReplace(value, options)
    }
    return query;
}

const processOptions = (getValue) => (options) => {
    const _values = getValue();

    if (!options) return _values;

    let resultQuery = { ..._values };

    resultQuery = recursiveReplace(resultQuery, options);

    return resultQuery;
}

export default processOptions;