interface iLocationOptions {
    parseBoolean: Boolean,
    parseNumber: Boolean,
}

export default function useLocationQuery(values: Object, options: iLocationOptions = {
    parseBoolean: true,
    parseNumber: true
}): iValues;