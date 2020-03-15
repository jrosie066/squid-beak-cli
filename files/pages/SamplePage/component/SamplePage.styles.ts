
export const styles = (theme: any) => ({
	root: {
		backgroundColor: theme.palette.primary.main,
		fontFamily: 'Bowlby One SC',
		width: '100vw',
		height: '100vh',
	},
	container: {
		width: '66%',
		margin: 'auto',
		paddingTop: '50px',
		display: 'flex',
		flexDirection: 'column' as 'column',
		justifyContent: 'center',
	},
	header: {
		fontSize: '5em',
		color: '#F0F5F4',
		textAlign: 'center' as CanvasTextAlign,
	},
	subheader: {
		fontSize: '2em',
		color: '#F0F5F4',
		textAlign: 'center' as CanvasTextAlign,
		paddingTop: '30px',
	},
	image: {
		height: '200px',
		margin: 'auto',
	},
});
