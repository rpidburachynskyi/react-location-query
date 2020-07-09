import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Provider } from 'mobx-react';
import mobx from './mobx';

ReactDOM.render(
	<Provider queryItems={mobx.queryItems}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
