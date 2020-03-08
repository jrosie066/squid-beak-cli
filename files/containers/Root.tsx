import React from 'react';
// import { ThemeProvider } from '@material-ui/core/styles';
import { JssProvider } from 'react-jss';
import jss from 'jss';
import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { jss } from '../assets/styles/global.styles';
// import { theme } from '../assets/styles/theme';

type Props = {
  store: any;
  routes: any;
};

const Root = ({ /* store, */routes }: Props) => {
  return (
    <JssProvider jss={jss}>
      {/* <ThemeProvider theme={theme}> */}
        {/* <Provider store={store}> */}
        <Router>
          {routes}
        </Router>
        {/* </Provider> */}
      {/* </ThemeProvider> */}
    </JssProvider>
  );
};

export { Root };
