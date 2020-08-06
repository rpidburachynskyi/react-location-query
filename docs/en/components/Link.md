# Link

This component is wrap to `Link` from `react-router-dom` which override `to` prop and added one new prop `query` to join in with `to`.

####Example:

```javascript
import { Link } from 'react-location-query';
...
<Link
	to='/products'
	query={{ page: 1, selectedProduct: 123 }}
>
	View this product in products page
</Link>
);
```

This example is identical to next:

```javascript
import { Link } from 'react-router-dom';
...
<Link
	to='/products?page=1&selectedProduct=123'>
	View this product in products page
</Link>
);
```

You can use second variant, but first is more easy and if you want use compress or crypto, you need to use this link (or [useQueryPush](/docs/en/hooks/useQueryPush.md 'useQueryPush'));
