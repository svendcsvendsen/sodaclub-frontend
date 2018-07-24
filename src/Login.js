import React, { Component } from 'react';
import { Grid, Row, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import backend from './models/backend'

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { user: '', password: '', redirect: false };
    }

    handleUsernameChange(e) {
        this.state.user = e.target.value;
        this.setState(this.state);
    }

    handlePasswordChange(e) {
        this.state.password = e.target.value;
        this.setState(this.state);
    }

    handleSubmit(e) {
        e.preventDefault();
        backend.authenticate(() => {
            this.state.redirect = true;
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
                        <FormGroup controlId="form-username">
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.user}
                                placeholder="Enter username"
                                onChange={this.handleUsernameChange}
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
                        <Button type="submit">Submit</Button>
                    </form>
                </Row>
            </Grid>
        );
  }
}

export default Login;
