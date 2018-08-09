import React, { Component } from 'react';
import { Grid, Row, FormGroup, ControlLabel, FormControl, Button, Modal} from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import Backend from './models/backend'

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
        this.handleFailureClose = this.handleFailureClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { user: '', password: '', repeat_password: '', redirect: false, show_failure: false };
    }

    handlePasswordChange(e) {
        this.setState({ ...this.state, password: e.target.value });
    }

    handleFailureClose(e) {
        this.setState({ ...this.state, show_failure: false });
    }

    handleRepeatPasswordChange(e) {
        this.setState({ ...this.state, repeat_password: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        var user_id = this.props.match.params.user_id
        var reset_key = this.props.match.params.reset_key
        Backend.reset_password(user_id, reset_key, this.state.password, () => {
            this.setState({ ...this.state, redirect: true });
        }, () => {
            this.setState({ ...this.state, show_failure: true });
        });
    }

    validPassword() {
        return this.state.password !== "" && this.state.password === this.state.repeat_password;
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/purchase"/>);
        }

        return (
            <Grid>
                <Row>
                    <h2>Password Reset</h2>
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
                    <Modal show={this.state.show_failure} onHide={this.handleFailureClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Password reset failed</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Password reset failed.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleFailureClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </Grid>
        );
  }
}

export default Login;
