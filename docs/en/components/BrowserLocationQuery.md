# BrowserLocationQuery

This component need to create context for optimize manipulation with location query. Pass this component in root component under `BrowserRouter` from `react-router-dom`.

####Example:

```javascript
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

You can pass next values:

-   [defaultOptions](/docs/en/options/DefaultOptions.md 'defaultOptions')
-   [sortOptions](/docs/en/options/SortOptions.md 'sortOptions')
-   [cryptoOptions](/docs/en/options/CryptoOptions.md 'cryptoOptions')
-   [rules](/docs/en/options/Rules.md 'rules')

**ATTENTION**: all values is optionals, you can pass only you need values.

### Example

```javascript
<BrowserLocationQuery
	sortOptions={{
		sortBy: 'alphabet',
		sortOrder: 'desc'
	}}
>
	<App />
</BrowserLocationQuery>
```

This example set sort by alphabet in reverse order.
