import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Classes from './examples/Classes';
import Enum from './examples/Enum';
import Json from './examples/Json';
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
				<Link to='/examples/json'>JSON</Link>
				<Link to='/examples/enum'>Enum</Link>
			</header>
			<div>
				<Switch>
					<Route path='/examples/simple' component={Simple} />
					<Route path='/examples/medium' component={Medium} />
					<Route path='/examples/withPush' component={WithPush} />
					<Route path='/examples/classes' component={Classes} />
					<Route path='/examples/json' component={Json} />
					<Route path='/examples/enum' component={Enum} />
				</Switch>
			</div>
		</div>
	);
};

export default App;
