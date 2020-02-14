import React from 'react';

export type Props = {
	classes: any;
}

const Test = (props: Props) => {
	const { classes } = props;
	return (
		<div className={classes.root}>
		add stuff here		</div>
	);
};

export { Test };
