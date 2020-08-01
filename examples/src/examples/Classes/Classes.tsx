import React from 'react';
// @ts-ignore
import { withLocationField, withQueryPush } from 'react-location-query';
import Musics from './Musics';
import Videos from './Videos';

class Classes extends React.Component<{
	contentType: string;
	setContentType: (value: any) => {};
	push: (path: string, value?: object) => void;
}> {
	getContent() {
		switch (this.props.contentType) {
			case 'videos':
				return <Videos />;
			case 'musics':
				return <Musics />;
		}
		return null;
	}

	render() {
		const content = this.getContent();
		const pushVideos = () =>
			this.props.push('/examples/classes', { type: 'videos', page: 1 });
		const pushMusics = () =>
			this.props.push('/examples/classes', { type: 'musics', page: 1 });
		return (
			<div>
				<div>
					<button onClick={pushVideos}>Videos</button>
					<button onClick={pushMusics}>Musics</button>
				</div>
				<div>{content}</div>
			</div>
		);
	}
}

export default withLocationField(
	'type',
	'videos',
	'contentType',
	'setContentType'
)(withQueryPush()(Classes));
