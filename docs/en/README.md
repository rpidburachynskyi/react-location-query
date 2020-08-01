#### react-location-query

Package for easier manipulation with location query.

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

---

### Minimal code to run

[This code in codesandbox.io](https://codesandbox.io/s/react-location-query-min-example-2x6lc 'This code in codesandbox.io')

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserLocationQuery, useLocationField } from 'react-location-query';
import { BrowserRouter } from 'react-router-dom';

function App() {
	const [name, setName] = useLocationField('name', {
		type: 'string',
		initial: 'Rostyslav'
	});

	return (
		<div className='App'>
			<h1>Hello {name}</h1>
			<div>
				<label>Change name: </label>
				<input value={name} onChange={(e) => setName(e.target.value)} />
			</div>
		</div>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<BrowserLocationQuery>
				<App />
			</BrowserLocationQuery>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
```

---

Package supports hooks, hocs and components to pass values in child function.

#### Hooks

-   [useLocationField](/docs/en/hooks/useLocationField.md 'useLocationField') - to create/get one value.
-   [useLocationFields](/docs/en/hooks/useLocationFields.md 'useLocationFields') - to create many values.
-   [useQueryPush](/docs/en/hooks/useQueryPush.md 'useQueryPush') - to push (or replace) new query.

Read about available hooks [here](/docs/hooks 'here').

#### Hocs

-   [withLocationField](/docs/en/hocs/withLocationField.md 'withLocationField') - to create/get one value.
-   [withLocationFields](/docs/en/hocs/withLocationFields.md 'withLocationFields') - to create many values.
-   [withQueryPush](/docs/en/hocs/withQueryPush.md 'withQueryPush') - to get function for push (or replace) new query.

Read about available hocs [here](/docs/hocs 'here').

#### Components

-   [BrowserLocationQuery](/docs/en/components/BrowserLocationQuery.md 'BrowserLocationQuery') - main component, need pass in the root component (or index.js);
-   [LocationQuery](/docs/en/components/LocationQuery.md 'LocationQuery') - to create many values and pass them in child function.

Read about available components [here](/docs/components 'here').

&copy; Pidburachynskyi Rostyslav
