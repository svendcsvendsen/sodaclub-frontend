import React from 'react';
import { Route, Redirect } from "react-router-dom";

import backend from './models/backend'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    backend.isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to={{pathname:'/login', state: { from: props.location}}} />
  )} />
)

export default PrivateRoute
