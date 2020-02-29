import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
// import your pages here

export const createRoutes = () => {
  return (
    <Switch>
      /* Add your base path page component here */
      <Route exact path="/" component="" />
      {
        [
          {
            component: '', /* Add your base path page here*/
            path: '/',
          },
          // add other pages in this array
          {
            component: '', /* Add your base path page here*/
            path: '/',
          },
        ].map((settings, index) => (
          < Route exact key={`Route-${index}`} {...settings} />
        ))
      }
      {/* TODO: change to Error route */}
      <Redirect from="*" to="/" />
    </Switch>
  );
};
