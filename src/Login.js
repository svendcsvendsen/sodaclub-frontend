import React, { Component } from 'react';
import { Grid, Row, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import { connect } from 'react-redux';
import { login } from './actions/authentication';

const mapStateToProps = (state) => {
    return {
        loginPending: state.loginPending,
        loginError: state.loginError,
        token: state.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password)),
    };
};

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { email: '', password: '' };
    }

    handleEmailChange(e) {
        this.setState({ ...this.state, email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ ...this.state, password: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.login(this.state.email, this.state.password);
    }

    render() {
        if (this.props.token !== null) {
            return (<Redirect to='/purchase'/>);
        }

        return (
            <Grid>
                <Row>
                    <h2>Login</h2>
                    { this.props.loginError !== null && <p>{this.props.loginError}</p> }
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="form-email">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.email}
                                placeholder="Enter email"
                                onChange={this.handleEmailChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="form-password">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                placeholder="Enter password"
                                onChange={this.handlePasswordChange}
                            />
                        </FormGroup>
                        <Button bsStyle="primary" type="submit" disabled={this.props.loginPending}>Submit</Button>
                    </form>
                </Row>
            </Grid>
        );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
