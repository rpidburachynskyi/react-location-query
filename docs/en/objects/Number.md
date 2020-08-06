## Number object

Number objects allow work with number, it provides next options:

| name              | description                                                                                        | type                        | optional | default  |
| ----------------- | -------------------------------------------------------------------------------------------------- | --------------------------- | -------- | -------- |
| type              | main field of objects, need to define it                                                           | `'number'`                  | no       | -        |
| initial           | initial value of field, will be replaced to it when value not passed                               | number                      | no       | -        |
| hideIfInitial     | option to hide value when it equals to initial                                                     | boolean                     | yes      | false    |
| integer           | option to allow only integer values, will convert non-integer value to integer by use `Math.floor` | boolean                     | yes      | false    |
| onParsedError     | function will be called when passed non-number value, if not pass, will set initial value          | `(value: string) => number` | yes      | -        |
| enum              | values can be only from enum, else onParsedEnumError                                               | Array of numbers            | yes      | -        |
| onParsedEnumError | function will be called when get values not included in enum, must return value from enum          | `(value: number) => number` | yes      | -        |
| validate          | function will be called every time to validate value, must return valid value                      | `(value: number) => number` | yes      | -        |
| actionOnChange    | fields to set rule for default behavior when value will change                                     | `'Push'` or `'Replace'`     | yes      | `'Push'` |

### Minimal example

```javascript
const [age, setAge] = useLocationField('age', {
	type: 'number',
	initial: 19
});
```

### Example with onParsedError

```javascript
const [type, setType] = useLocationField('type', {
	type: 'number',
	initial: 1,
	onParsedError: (value) => 5
});
```

In this example, if we passed non-number value (example `'q5'`) to location string, it will replace to `5`, if we not pass onParsedError function, it will replace to initial values (in this case to '1');

### Example with integer

```javascript
const [count, setCount] = useLocationField('count', {
	type: 'number',
	initial: 0,
	integer: true
});
```

In this example, if we passed float value, it will converts to integer by using `Math.floor`.

### Example with enum

```javascript
const [type, setType] = useLocationField('type', {
	type: 'number',
	initial: 1,
	enum: [1, 2, 3, 5, 7],
	onParsedEnumError: (value) => 5
});
```

In this example, if type will get value not from enum array, it will convert to `5`, but if we will not pass onParsedEnumError, it will convert to initial value (in this case to `1`)

### Example with validate

```javascript
const [age, setAge] = useLocationField('age', {
	type: 'number',
	initial: 0,
	validate: (value) => {
		if (value > 120) return 120;
		if (value < 0) return 0;
		return value;
	}
});
```

In this example, if age will get value bigger then 120 it will convert to `120`, if age will get value smaller them 0 it will convert to `0`.
