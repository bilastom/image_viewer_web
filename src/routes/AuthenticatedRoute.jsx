import React from "react"
import { Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props =>
    localStorage.getItem("jwt") ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: "/login",
        state: { from: props.location}
      }} />
    )
  }/>
)

export default AuthenticatedRoute
