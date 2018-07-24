import React from 'react';
import { Route, Redirect } from "react-router-dom";

import Backend from './models/backend'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Backend.isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to={{pathname:'/login', state: { from: props.location}}} />
  )} />
)

export default PrivateRoute
