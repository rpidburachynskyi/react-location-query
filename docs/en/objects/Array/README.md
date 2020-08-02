## Array object

Array objects allow work with array, it provides next options:

| name              | description                                                                                                           | type                                            | optional | default  |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------- | -------- |
| type              | main field of objects, need to define it                                                                              | `'array'`                                       | no       | -        |
| arrayType         | main field of array, need to define type of array                                                                     | `'string'` or `'number'` or `'boolean'`         | no       | -        |
| initial           | initial value of field, will be replaced to it when value not passed                                                  | Array of `arrayType`                            | no       | -        |
| hideIfInitial     | option to hide value when it equals to initial                                                                        | boolean                                         | yes      | false    |
| validate          | function will be called every time to validate value, must return valid value                                         | `(value: Array<arrayType>) => Array<arrayType>` | yes      | -        |
| onParsedError     | function will be called when passed uncorrect array, if not pass, will set initial value                              | `(value: string) => Array<arrayType>`           | yes      | -        |
| onParsedItemError | function will be called when passed uncorrect array but for each uncorrect item, if not pass, will call onParsedError | `(value: string) => arrayType`                  | yes      | -        |
| actionOnChange    | fields to set rule for default behavior when value will change                                                        | `'Push'` or `'Replace'`                         | yes      | `'Push'` |

**ATTENTION**: All single values will replace to array with one item, it not passed any value, will replace to empty array.

### Minimal example

```javascript
const [selectedPages, setSelectedPages] = useLocationField('selectedPages', {
	type: 'array',
	arrayType: 'number',
	initial: []
});
```

### Example with onParsedItemError

```javascript
const [selectedPages, setSelectedPages] = useLocationField('selectedPages', {
	type: 'array',
	arrayType: 'boolean'
	initial: [false],
	onParsedItemError: (value) => true
});
```

In this example, if we passed non-boolean value (example `'false1'` or `'123'`) to location string, it will replace to true, if we not pass onParsedItemError function, it will call onParsedError.

### Example with onParsedError

```javascript
const [selectedPages, setSelectedPages] = useLocationField('selectedPages', {
	type: 'array',
	arrayType: 'boolean'
	initial: [false]
});
```

In this example, if we passed non-boolean value to any item (example `'false1'` or `'123'`) to location string, it will replace to true, if we not pass onParsedError function, it will replace to initial (in this case to `[false]`).

### Example with validate

```javascript
const pagesCount = 20;
const [selectedPages, setSelectedPages] = useLocationField('selectedPages', {
	type: 'array',
	arrayType: 'number'
	initial: [],
	validate: (value) => {
		return value.filter(item => item > 0 && item < pagesCount);
	}
});
```

In this example, if passed array of pages, all items bigger then `pagesCount` or smaller them `0` will removed.
