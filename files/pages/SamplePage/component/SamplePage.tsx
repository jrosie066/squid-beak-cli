import React from 'react';
import squidImg from '../../../assets/images/dark-squid-logo@2x.png';
// import Test from '../../../components/Test/Test';

export type Props = {
	classes: any;
}

const SamplePage = (props: Props) => {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<div className={classes.header}>
					SquidBeak
			</div>
				<img src={squidImg} className={classes.image} alt="squid"/>
				<div className={classes.subheader}>
					React Starter App
			</div>
			</div>
			{/* <Test /> */}
		</div>
	);
};

export { SamplePage };
