## useLocationFieldT

It's just clone of `useLocationField` with single argument, but here you can pass value as generic.

### Examples

Without generic

```javascript
const [name, setName] = useLocationFieldT('name');
// name - any, setName - (value: any) => void
```

With passing `string`

```javascript
const [name, setName] = useLocationFieldT < string > 'name';
// name - string, setName - (value: string) => void
```

With passing `number`

```javascript
const [age, setAge] = useLocationFieldT < number > 'age';
// name - number, setName - (value: number) => void
```

With passing `boolean`

```javascript
const [isCheck, setIsCheck] = useLocationFieldT < boolean > 'isCheck';
// name - boolean, setName - (value: boolean) => void
```

With passing `array`:

```javascript
const [array, setArray] = useLocationFieldT<string[]>('array');
// name - string[], setName - (value: string[]) => void
```

```javascript
const [array, setArray] = useLocationFieldT<number[]>('array');
// name - number[], setName - (value: number[]) => void
```

```javascript
const [array, setArray] = useLocationFieldT<boolean[]>('array');
// name - boolean[], setName - (value: boolean[]) => void
```
