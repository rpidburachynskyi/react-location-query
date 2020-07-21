import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Medium from './examples/Medium';
import Simple from './examples/Simple';

const App = () => {
	return (
		<div>
			<header>
				<Link to='/examples/simple'>Simple</Link>
				<Link to='/examples/medium'>Medium</Link>
			</header>
			<div>
				<Switch>
					<Route path='/examples/simple' component={Simple} />
					<Route path='/examples/medium' component={Medium} />
				</Switch>
			</div>
		</div>
	);
};

export default App;
