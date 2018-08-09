import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     props.token !== null
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//   )} />
// )

const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      token !== null
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);

export default connect(mapStateToProps)(PrivateRoute);
