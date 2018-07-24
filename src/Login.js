import React, { Component } from 'react';
import { Grid, Row, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import Backend from './models/backend'

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { user: '', password: '', redirect: false };
    }

    handleEmailChange(e) {
        this.state.user = e.target.value;
        this.setState(this.state);
    }

    handlePasswordChange(e) {
        this.state.password = e.target.value;
        this.setState(this.state);
    }

    handleSubmit(e) {
        e.preventDefault();
        Backend.authenticate(this.state.user, this.state.password, () => {
            this.state.redirect = true;
            this.setState(this.state);
        }, () => {
            console.log("Failed login")
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
                </Row>
            </Grid>
        );
  }
}

export default Login;
