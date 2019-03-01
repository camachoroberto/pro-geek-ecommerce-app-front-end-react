import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute = ({ component: Component, user}) => {
  console.log({ component: Component, user,});
  return (
    <Route
      render={(props) => {
        if (user) {
          return <Component {...props} loggedInUser={user} />;
        }
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }
      }
    />
  );
};
export default protectedRoute;
