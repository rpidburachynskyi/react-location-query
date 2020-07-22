import React from 'react';
import { useHistoryPush } from '../..';

function withHistoryPush(replaceToName?: string) {
	return (WrapperComponent: any) => (props: any) => {
		const name = replaceToName || 'push';
		const push = useHistoryPush();
		return <WrapperComponent {...props} {...{ [name]: push }} />;
	};
}
export default withHistoryPush;
