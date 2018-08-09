import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Purchase from './Purchase';
import Info from './Info';
import Login from './Login';
import PasswordReset from './PasswordReset';
import PrivateRoute from './PrivateRoute';
import LogoutButton from './LogoutButton';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        balance: state.balance,
        tokenVerificationPending: state.tokenVerificationPending,
    };
};

class App extends Component {
    // constructor(props, context) {
    //     super(props, context);
    // }

    isAuthenticated() {
        return this.props.balance !== null;
    }

    render() {
        if (this.props.tokenVerificationPending)
            return (<p>Rehydrating store...</p>);

        return (
            <Router><div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home">Sodaclub</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem href="/">Info</NavItem>
                        { !this.isAuthenticated() && <NavItem href="/login">Login</NavItem>}
                        { this.isAuthenticated() && <NavItem href="/purchase">Purchase</NavItem> }
                        { this.isAuthenticated() && <LogoutButton /> }
                    </Nav>

                    { this.isAuthenticated() && <Navbar.Text pullRight>Balance: {this.props.balance}¤</Navbar.Text> }
                </Navbar>

                <Route exact path="/" component={Info} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/purchase" component={Purchase} />
                <Route path="/password-reset/:user_id/:reset_key" component={PasswordReset} />
            </div></Router>
        );

    }
}

export default connect(mapStateToProps)(App);
