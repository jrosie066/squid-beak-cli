import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import your pages here

export const createRoutes = () => (
    <Switch>
      /* Add your base path page component here */
      {/* <Route exact path="/" component="" /> */}
      {
        [
          // {
          //   component: '', /* Add your base path page here*/
          //   path: '/',
          // },
          // add other pages in this array
        ].map((settings, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Route exact key={`Route-${index}`} {...settings} />
        ))
      }
      {/* TODO: change to Error route */}
      <Redirect from="*" to="/" />
    </Switch>
  );
  