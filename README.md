# How to install
```bash
npm i react-use-location-query
```

# How to use
```jsx
import useLocationQuery from 'react-user-location-query';

function App (){
  const { query: { text } } = useLocationQuery({ text: "default value"});
  
  return <span>{ text }</span>
}
```
If text isn't exists, it'll take value from first argument object: 'default value';

Arguments: 
1.  values - receive values and use them if each key is not exists in query
2. options - receive options.

### Handlers
| setQuery | receive object, which have key from values and use it |
| ------------ |
|   |


### Options
| parseBoolean | indicates whether to convert text values to Boolean - "true" and "false"  |
| - |



    
## Examples
Example button, which changes side parameter in query
```jsx
import AsComponent from 'react-as-component';

const Purchases = () => {
    const { query: { side }, setQuery } = useLocationQuery({ side: 'left' });

    return <button onClick={() => setQuery({ side: side === "left" ? "right" : "left" })}>{side}</button>
	}
```