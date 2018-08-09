import React, { Component } from 'react';
import { Grid, Row, FormGroup, ControlLabel, FormControl, Button }  from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import { connect } from 'react-redux';
import { resetPassword } from './actions/authentication';

const mapStateToProps = (state) => {
    return {
        passwordResetPending: state.passwordResetPending,
        passwordResetError: state.passwordResetError,
        token: state.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (user_id, reset_key, password) => dispatch(resetPassword(user_id, reset_key, password)),
    };
};

class PasswordReset extends Component {
    constructor(props, context) {
        super(props, context);

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { user: '', password: '', repeat_password: '' };
    }

    handlePasswordChange(e) {
        this.setState({ ...this.state, password: e.target.value });
    }

    handleRepeatPasswordChange(e) {
        this.setState({ ...this.state, repeat_password: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user_id = this.props.match.params.user_id
        const reset_key = this.props.match.params.reset_key

        this.props.resetPassword(user_id, reset_key, this.state.password);
    }

    validPassword() {
        return this.state.password !== "" && this.state.password === this.state.repeat_password;
    }

    render() {
        if (this.props.token !== null) {
            return (<Redirect to='/purchase'/>);
        }

        return (
            <Grid>
                <Row>
                    <h2>Password Reset</h2>
                    { this.props.loginError !== null && <p>{this.props.loginError}</p> }
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="form-password">
                            <ControlLabel>New Password</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                placeholder="Enter password"
                                onChange={this.handlePasswordChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="form-repeat-password">
                            <ControlLabel>Repeat Password</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.repeat_password}
                                placeholder="Repeat password"
                                onChange={this.handleRepeatPasswordChange}
                            />
                        </FormGroup>
                        <Button bsStyle="primary" disabled={!this.validPassword()} type="submit">Submit</Button>
                    </form>
                </Row>
            </Grid>
        );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
