import React from 'react';
import { useQueryPush } from '../..';

function withQueryPush(replaceToName?: string) {
	return (WrapperComponent: any) => (props: any) => {
		const name = replaceToName || 'push';
		const push = useQueryPush();
		return <WrapperComponent {...props} {...{ [name]: push }} />;
	};
}
export default withQueryPush;
