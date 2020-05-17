interface iLocationOptions {
    parseBoolean: Boolean,
    parseNumber: Boolean,

    hideFalseValues: Boolean
}

export default function useLocationQuery(values: Object, options: iLocationOptions = {
    parseBoolean: true,
    parseNumber: true,

    hideFalseValues: false
}): iValues;