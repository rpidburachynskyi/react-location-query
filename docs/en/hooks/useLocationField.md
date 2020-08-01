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

