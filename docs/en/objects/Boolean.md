## Boolean object

Boolean objects allow work with boolean, it provides next options:

| name           | description                                                                                | type                          | optional | default  |
| -------------- | ------------------------------------------------------------------------------------------ | ----------------------------- | -------- | -------- |
| type           | main field of objects, need to define it                                                   | `'boolean'`                   | no       | -        |
| initial        | initial value of field, will be replaced to it when value not passed                       | boolean                       | no       | -        |
| hideIfInitial  | option to hide value when it equals to initial                                             | boolean                       | yes      | false    |
| validate       | function will be called every time to validate value, must return valid value              | `(value: boolean) => boolean` | yes      | -        |
| onParsedError  | function will be called when passed non-boolean value, if not pass, will set initial value | `(value: string) => boolean`  | yes      | -        |
| actionOnChange | fields to set rule for default behavior when value will change                             | `'Push'` or `'Replace'`       | yes      | `'Push'` |

### Minimal example

```javascript
const [checkAll, setCheckAll] = useLocationField('checkAll', {
	type: 'boolean',
	initial: false
});
```

### Example with onParsedError

```javascript
const [checkAll, setCheclAll] = useLocationField('checkAll', {
	type: 'boolean',
	initial: false,
	onParsedError: (value) => true
});
```

In this example, if we passed non-boolean value (example `'false1'` or `'123'`) to location string, it will replace to true, if we not pass onParsedError function, it will replace to initial values (in this case to false);

### Example with validate

```javascript
const notAllowed = getUserCheckAllAllowed();
const [checkAll, setCheckAll] = useLocationField('checkAll', {
	type: 'boolean',
	initial: false,
	validate: (value) => {
		if (value && notAllowed) {
			alert("Set flag 'checkAll' not allowed for you");
			return false;
		}
		return value;
	}
});
```

In this example, if checkAll will get `true` and we have no rights to check it, it will replace to `false` with alert;
