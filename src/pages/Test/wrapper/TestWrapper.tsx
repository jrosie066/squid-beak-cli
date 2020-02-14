import React from 'react';

type Props = {
}

const TestWrapper = (WrappedComponent: any) => {
	const TestPageWrapper = (props: Props) => {
		return <WrappedComponent {...props} />;
	};
	return TestPageWrapper;
}
export { TestWrapper };
