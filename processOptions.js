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

        if (options.parseNumber) query[key] = replaceNumber(query[key]);
        if (options.parseBoolean) query[key] = replaceBoolean(query[key]);

        if (typeof query[key] === 'object') query[key] = recursiveReplace(query[key], options);
        if (Array.isArray(query[key])) query[key] = recursiveReplace(query[key], options)
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