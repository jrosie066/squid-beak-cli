import React from 'react';

type Props = {
}

const SamplePageWrapper = (WrappedComponent: any) => {
	const SamplePagePageWrapper = (props: Props) => {
		return <WrappedComponent {...props} />;
	};
	return SamplePagePageWrapper;
}
export { SamplePageWrapper };
