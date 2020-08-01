## withLocationField

HOC wrapped [useLocationField](/docs/en/hooks/useLocationField.md 'useLocationField') hook

#### Example

```ts
export default withLocationField('name', {
	type: 'string',
	initial: 'Rostyslav'
})(Component);
```

it\`s identical as we could pass JavaScript value

```ts
export default withLocationField('name', 'Rostyslav')(Component);
```

#### Return value

This hoc pass into component props two fields [name] and set[Name] where `name` getted from first argument, you also can pass name for [name] and set[Name] in third and fourth argument. Example:

```javascript
export default withLocationField(
	'name',
	'Rostyslav',
	'myName',
	'setMyName'
)(Component);
```

Returned fields identical as in [useLocationField](/docs/en/hooks/useLocationField.md 'useLocationField') hook.

# Example

[codesandbox.io](https://codesandbox.io/s/react-location-query-with-location-field-example-fk6uv? 'codesandbox.io')

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserLocationQuery, withLocationField } from 'react-location-query';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
	render() {
		const { name, setName } = this.props;

		return (
			<div className='App'>
				<h1>Hello {name}</h1>
				<div>
					<label>Change name: </label>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
			</div>
		);
	}
}

const AppComponent = withLocationField('name', 'Rostyslav')(App);

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<BrowserLocationQuery>
				<AppComponent />
			</BrowserLocationQuery>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
```
