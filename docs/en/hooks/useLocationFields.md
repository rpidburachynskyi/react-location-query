## useLocationFields

Hook to create many field. Hook accepts single argument - object, where `keys` is field names, `values` - field values. You can pass as [Object](/docs/en/objects/README.md 'Object') or JavaScript value (`number` or `string` or `boolean` or `array` of prev types);

#### Example

```ts
const { query, setQueryField } = useLocationFields({
	name: {
		type: 'string',
		initial: 'Rostyslav'
	},
	age: 19,
	married: false
});
```

it\`s identical as we useing useLocationField three time.

```ts
const [name] = useLocationField('name', {
	type: 'string',
	initial: 'Rostyslav'
});
const [age] = useLocationField('age', 19);
const [married] = useLocationField('married', false);
```

But instead default setters as `set[name]`, it returns `setQueryField` function to pass field name as first argument and value as second argument

### Example

```javascript
const {
	query: { name, aget, married },
	setQueryField
} = useLocationFields({
	name: {
		type: 'string',
		initial: 'Rostyslav'
	},
	age: 19,
	married: false
});
// other actions
setQueryField('name', 'Rostik'); // - set name
setQueryField('age', 20); // - set age
setQueryField('married', true); // - set married
```
