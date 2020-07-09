# react-location-query

DEPRECATED, use instead [react-location-query](https://github.com/kitsoRik/react-location-query 'react-location-query')

# Description

React hook to manipulate with location query.

# How to install

`npm install react-location-query --save`

# How to use

To use hook, you need install and use `react-router-dom`. Use this package in component which wrapped by `BrowserRouter` from `react-router-dom`.

To call hook you need pass first parameters as object with keys you want to pass to location path, which will be controlling by this component. Values can be next types:

-   `string | number | boolean | Array< string | number | boolean >`
    or object which describe options of field with next fields:
-   type - string field which stored type of field (`'string' | 'number' | 'boolean' | 'array'`)
-   initial - initial value
-   hideIfInitial - boolean options which allow to hide value if it is initial
-   arrayType - values of array type (only with `type === array`)

This hook returns object with next fields:

-   query - object with valid values from first parameters hook
-   fullQuery - all query from your application
-   setQueryField - function `(fieldName: string, value: any) => void` to change location query value

# Example

    const {
    		query: { name, surname, age },
    		setQueryField
    	} = useLocationQuery({
    		name: {
    			type: 'string',
    			initial: 'Rostyslav',
    			hideIfInitial: false
    		},
    		surname: 'Pidburachynskyi',
    		age: {
    			type: 'number',
    			initial: 19
    		}
    	});
