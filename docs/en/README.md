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

# Hooks

## useLocationField

Hook to easier get/set single field value.
First argument - `name` of field, second - `value`. It returns couple as `[value, setValue]`;

Object can provide next options:

| Name                        | Description                                          | Default value  |
| --------------------------- | ---------------------------------------------------- | -------------- |
| type                        | type of field                                        | (not optional) |
| initial                     | initial value of field                               | (not optional) |
| hideIfInitial               | option to hide if initial from query                 | false          |
| onParsedError               | callback for get value if it cannot be parsed        | -              |
| replaceValueWhenParsedError | option to replace value in query after onParsedError | true           |

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

