import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SamplePage } from './SamplePage';

export const createRoutes = () => (
  <Switch>
    <Route exact path="/" component={SamplePage} />
    {
        [
          {
            component: SamplePage,
            path: '/',
          }
        ].map((settings, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Route exact key={`Route-${index}`} {...settings} />
        ))
      }
    {/* TODO: change to Error route */}
    <Redirect from="*" to="/" />
  </Switch>
);
