import React from 'react';
import { useLocationClear } from '../..';

const withLocationClear = (WrapperComponent: any) => (props: any) => {
	useLocationClear();
	return <WrapperComponent {...props} />;
};

export default withLocationClear;
