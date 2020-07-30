import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { setOptions, BrowserLocationQuery } from 'react-location-query';

setOptions({
	removeUnusedQueryFields: true
});
ReactDOM.render(
	<React.StrictMode>
		<Router>
			<BrowserLocationQuery>
				<App />
			</BrowserLocationQuery>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
