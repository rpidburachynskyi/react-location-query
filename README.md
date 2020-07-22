#### react-location-query

Set of hooks for easier manipulation with location query

#### Examples

-   Simple - [codesandbox.io](https://codesandbox.io/s/react-location-query-low-2ohwl 'codesandbox.io')
-   Medium - [codesandbox.io](https://codesandbox.io/s/react-location-query-examples-medium-3j0je 'codesandbox.io')
-   With push - [codesandbox.io](https://codesandbox.io/s/react-location-query-examples-with-push-qgb6s 'codesandbox.io')
-   Classes - [codesandbox.io](https://codesandbox.io/s/react-location-query-examples-classes-ed6x8 'codesandbox.io')

#### How to install

`npm install react-location-query --save`

### Oportunity

-   get value form query
-   set value to query
-   automaticly parse value to any JavaScript value
-   share field by deffirent components
-   hide value if it didn't change (optional)
-   proccess when passed incorrect value to query (optional)
-   work with all standart types (string | number | boolean | array)
-   work with non-standart types (json)

## Hooks

# useLocationQuery

Hook for work with standart types.
To use - pass object where `key` - field name, `value` - value. Value can be object or JavaScript value which automaticly will transform to object.

#### Example

```ts
const {
	query: { name, age },
	setQueryField
} = useLocationQuery({
	name: {
		type: 'string',
		initial: 'Rostyslav',
		hideIfInitial: true
	},
	age: {
		type: 'number',
		initial: 19,
		onParsedError: (value: string) => {
			// value from query and cannot be parsed to number
			return 1;
		}
	}
});

const setName = (name: string) => setQueryField('name', name);
const setAge = (age: number) => setQueryField('age', age);
```

Object can provide next options:

| Name                        | Description                                          | Default value  |
| --------------------------- | ---------------------------------------------------- | -------------- |
| type                        | type of field                                        | (not optional) |
| initial                     | initial value of field                               | (not optional) |
| hideIfInitial               | option to hide if initial from query                 | false          |
| onParsedError               | callback for get value if it cannot be parsed        | -              |
| replaceValueWhenParsedError | option to replace value in query after onParsedError | true           |

# useLocationQueryExtend

Hook for work with standart and non-standart types.
Extended all functional from useLocationQuery hook. Provide next additional types:

-   json

#### Example

```ts
const {
	query: { data },
	setQueryField
} = useLocationQueryExtend({
	data: {
		type: 'json',
		initial: {
			name: 'Rostyslav',
			age: 19
		},
		onParsedError: (value: string) => {
			return {
				name: 'Unknown',
				age: 0
			};
		}
	}
});

const setData = (data: object) => setQueryField('data', data);
```

# useLocationField

Wrapped hook on useLocationQueryExtend to easier get/set single field value.
First argument - `name` of field, second - `value`. It returns couple as `[value, setValue]`;

#### Example

```ts
const [name, setName] = useLocationField('name', {
	type: 'string',
	initial: 'Rostyslav',
	hideIfInitial: false
});
```

or identical with JavaScript value

```ts
const [name, setName] = useLocationField('name', 'Rostyslav');
```

# useLocationClear

Just add this hook in the root component of your app to clear unused query fields (look options)

#### Example

```ts
useLocationClear();
```

# Options

You can set global options by using `setOptions` function.

Now we support next options:

| Name                    | Description                             | Default value |
| ----------------------- | --------------------------------------- | ------------- |
| removeUnusedQueryFields | options to remove unused query fields   | false         |
| sortingOptions          | for ordering query fields (see options) | -             |
| defaultOptions          | global default values for fields        | -             |

### Sorting options

| Name      | Description                    | Default value |
| --------- | ------------------------------ | ------------- |
| sortBy    | chose sort method              | index         |
| sortOrder | chose sort order (asc or desc) | asc           |

#### Example

```ts
setOptions({
	removeUnusedQueryFields: true,
	defaultOptions: {
		hideIfDefault: true,
		replaceValueWhenParsedError: true
	},
	sortingOptions: {
		sortBy: 'index',
		sortOrder: 'asc'
	}
});
```

**ATTENTION**: all options is optionals and have default value, you can pass only needed options;
