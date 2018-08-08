import React, { Component } from 'react';
import { Grid, Row, FormGroup, ControlLabel, FormControl, Button, Modal} from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import Backend from './models/backend'

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFailureClose = this.handleFailureClose.bind(this);
        this.state = { user: '', password: '', redirect: false, show_failure: false };
    }

    handleEmailChange(e) {
        this.state.user = e.target.value;
        this.setState(this.state);
    }

    handlePasswordChange(e) {
        this.state.password = e.target.value;
        this.setState(this.state);
    }

    handleFailureClose(e) {
        this.state.show_failure = false;
        this.setState(this.state);
    }

    handleSubmit(e) {
        e.preventDefault();
        Backend.authenticate(this.state.user, this.state.password, () => {
            this.state.redirect = true;
            this.setState(this.state);
        }, () => {
            this.state.show_failure = true;
            this.setState(this.state);
        });
    }

    render() {
        if (this.state.redirect) {
            const { from } = this.props.location.state || { from: { pathname: '/purchase' } }
            return (<Redirect to={from}/>);
        }

        return (
            <Grid>
                <Row>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="form-email">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.user}
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
                        <Button bsStyle="primary" type="submit">Submit</Button>
                    </form>
                    <Modal show={this.state.show_failure} onHide={this.handleFailureClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Login failed</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Login failed.</p>
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
