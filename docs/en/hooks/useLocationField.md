## useLocationField

Hook to easier get/set single field value.
First argument - `name` of field, second - `value`. It returns couple as `[value, setValue]`;

#### Example

```ts
const [name, setName] = useLocationField('name', {
	type: 'string',
	initial: 'Rostyslav'
});
```

it\`s identical as we could pass JavaScript value

```ts
const [name, setName] = useLocationField('name', 'Rostyslav');
```

#### Return value

Hook return array with two items::

-   value - always correct (if not correct, package modify it according to rules)
-   function - to set value, it accepts the next parameters
-   value - new value of field
-   actionOnChangee - this argument accepts string ( `Push` or `Replace`) to choose how to change value (read about this on [behavior](/docs/en/behavior/History.md 'behavior')).
