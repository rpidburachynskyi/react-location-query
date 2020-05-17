interface iLocationOptions {
    parseBoolean: Boolean,
    parseNumber: Boolean,
}

export default function useLocationQuery(values: Object, options: iLocationOptions = {
    allowArray: true,
    allowObject: false,

    parseBoolean: true,
    parseNumber: true
}): iValues;