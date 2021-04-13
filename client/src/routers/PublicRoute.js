import React from "react";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/dashboard", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}

export default PublicRoute;
