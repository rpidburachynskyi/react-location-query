import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { setOptions } from 'react-location-query';

setOptions({
	removeUnusedQueryFields: true,
	crypto: {
		method: 'xor',
		key: 'qwe',
		compessedToBase64: true
	}
});
ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
