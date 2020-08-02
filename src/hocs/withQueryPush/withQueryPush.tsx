import React, { useContext } from 'react';
import { useQueryPush } from '../..';
import Context from '../../lib/context/context';

function withQueryPush(replaceToName?: string) {
	return (WrapperComponent: any) => (props: any) => {
		const context = useContext(Context);

		if (!context) {
			throw new Error(
				'You must use withQueryPush inside BrowserLocationQuery'
			);
		}

		const name = replaceToName || 'push';
		const push = useQueryPush();
		return <WrapperComponent {...props} {...{ [name]: push }} />;
	};
}
export default withQueryPush;
