import React from 'react';

const withLocationClear = (WrapperComponent: any) => (props: any) => {
	return <WrapperComponent {...props} />;
};

export default withLocationClear;
