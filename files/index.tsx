import React from 'react';
import { render } from 'react-dom';
import { Root } from './containers/Root';
// import { store } from '../redux';
import { createRoutes } from './pages/routes';
import * as serviceWorker from './serviceWorker';

const routes = createRoutes();

// TODO: add store
render(<Root store="" routes={routes} />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
