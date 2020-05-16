const replaceBooleanValues = (query = {}) => {
    const keys = Object.keys(query);
    for (let i = 0; i < keys.length; i++) {
        if (query[keys[i]] === "true") query[keys[i]] = true;
        else if (query[keys[i]] === "false") query[keys[i]] = false;
    }
    return query;
}

const processOptions = (getValue) => (options) => {
    const _values = getValue();

    if (!options) return _values;

    let resultQuery = { ..._values };

    if (options.parseBoolean) resultQuery = replaceBooleanValues(_values);

    return resultQuery;
}

export default processOptions;