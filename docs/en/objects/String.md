## String object

String objects allow work with string, it provides next options:

| name              | description                                                                               | type                        | optional | default  |
| ----------------- | ----------------------------------------------------------------------------------------- | --------------------------- | -------- | -------- |
| type              | main field of objects, need to define it                                                  | `'string'`                  | no       | -        |
| initial           | initial value of field, will be replaced to it when value not passed                      | string                      | no       | -        |
| hideIfInitial     | option to hide value when it equals to initial                                            | boolean                     | yes      | false    |
| enum              | values can be only from enum, else onParsedEnumError                                      | Array of strings            | yes      | -        |
| onParsedEnumError | function will be called when get values not included in enum, must return value from enum | `(value: string) => string` | yes      | -        |
| validate          | function will be called every time to validate value, must return valid value             | `(value: string) => string` | yes      | -        |
| actionOnChange    | fields to set rule for default behavior when value will change                            | `'Push'` or `'Replace'`     | yes      | `'Push'` |

### Minimal example

```javascript
const [name, setName] = useLocationField('name', {
	type: 'string',
	initial: 'Rostyslav'
});
```

### Example with enum

```javascript
const [type, setType] = useLocationField('type', {
	type: 'string',
	initial: 'audio',
	enum: ['audio', 'video', 'image'],
	onParsedEnumError: (value) => 'video'
});
```

In this example, if type will get value not from enum array, it will convert to `'video'`, but if we will not pass onParsedEnumError, it will convert to initial value (in this case to `'audio'`)

### Example with validate

```javascript
const [type, setType] = useLocationField('type', {
	type: 'string',
	initial: 'test-audio',
	validate: (value) => {
		if (!value.startsWith('test-')) {
			return 'test-' + value;
		}
		return value;
	}
});
```

In this example, if type will get value not started with `"test-"`, it will convert to `"test-" + value`.
