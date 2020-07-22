import React from 'react';
import { withLocationField } from 'react-location-query';

class Musics extends React.Component<{
	page: number;
	setPage: (value: number) => {};
}> {
	render() {
		const page = this.props.page;
		return (
			<div>
				<div>Page: {page}</div>
				<div>
					<button onClick={() => this.props.setPage(page - 1)}>
						-1
					</button>
					<button onClick={() => this.props.setPage(page + 1)}>
						+1
					</button>
				</div>
			</div>
		);
	}
}

export default withLocationField('page', 1)(Musics);
