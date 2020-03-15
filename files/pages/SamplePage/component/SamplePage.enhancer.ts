import { withStyles } from '@material-ui/core/styles';
import { memo, FunctionComponent } from 'react';
import { compose } from 'redux';
import { styles } from './SamplePage.styles';
import { Props } from './SamplePage';

const enhance = compose<FunctionComponent<Props>>(
	memo,
	withStyles(styles)
);
export { enhance };
