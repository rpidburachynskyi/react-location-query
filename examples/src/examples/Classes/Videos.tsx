import React from 'react';
import { withLocationField } from 'react-location-query';

class Videos extends React.Component<{ page: number }> {
	render() {
		const page = this.props.page;
		return (
			<div>
				<div>Page: {page}</div>
			</div>
		);
	}
}

export default withLocationField('page', 1)(Videos);
