import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Classes from './examples/Classes';
import Medium from './examples/Medium';
import Simple from './examples/Simple';
import WithPush from './examples/WithPush';

const App = () => {
	return (
		<div>
			<header>
				<Link to='/examples/simple'>Simple</Link>
				<Link to='/examples/medium'>Medium</Link>
				<Link to='/examples/withPush'>With push</Link>
				<Link to='/examples/classes'>Classes</Link>
			</header>
			<div>
				<Switch>
					<Route path='/examples/simple' component={Simple} />
					<Route path='/examples/medium' component={Medium} />
					<Route path='/examples/withPush' component={WithPush} />
					<Route path='/examples/classes' component={Classes} />
				</Switch>
			</div>
		</div>
	);
};

export default App;
