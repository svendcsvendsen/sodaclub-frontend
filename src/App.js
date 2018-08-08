import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Purchase from './Purchase';
import Info from './Info';
import Login from './Login';
import PasswordReset from './PasswordReset';
import PrivateRoute from './PrivateRoute';
import Backend from './models/backend'

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleBackendChange = this.handleBackendChange.bind(this);

        Backend.subscribe(this.handleBackendChange);
        var balance = (Backend.isAuthenticated() ? Backend.getBalance() : null);
        this.state = {is_authenticated: Backend.isAuthenticated(), balance: balance};
    }

    handleLogoutClick(e) {
        Backend.signout(() => {
            this.setState(this.state);
            console.log('logout');
        });
    }

    handleBackendChange() {
        var balance = (Backend.isAuthenticated() ? Backend.getBalance() : null);
        this.setState({authenticated: Backend.isAuthenticated(), balance: balance});
    }

    render() {
        return (
            <Router><div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home">Sodaclub</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} href="/">Info</NavItem>
                        { !this.state.is_authenticated && <NavItem eventKey={1} href="/login">Login</NavItem>}
                        { this.state.is_authenticated && <NavItem eventKey={1} href="/purchase">Purchase</NavItem> }
                        { this.state.is_authenticated && <NavItem eventKey={1} onClick={this.handleLogoutClick}>Logout</NavItem> }
                    </Nav>

                    { this.state.balance !== null && <Navbar.Text pullRight>Balance: {this.state.balance}¤</Navbar.Text> }
                </Navbar>

                <Route exact path="/" component={Info} />
                <Route exact path="/login" component={Login} />
                <Route path="/password-reset/:user_id/:reset_key" component={PasswordReset} />
                <PrivateRoute exact path="/purchase" component={Purchase} />
            </div></Router>
        );
    }
}

export default App;
