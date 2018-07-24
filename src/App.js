import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Purchase from './Purchase';
import Info from './Info';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Backend from './models/backend'

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick(e) {
        Backend.signout(() => {
            this.setState(this.state);
            console.log('logout');
        });
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
                        { !Backend.isAuthenticated() && <NavItem eventKey={1} href="/login">Login</NavItem>}
                        { Backend.isAuthenticated() && <NavItem eventKey={1} href="/purchase">Purchase</NavItem> }
                        { Backend.isAuthenticated() && <NavItem eventKey={1} onClick={this.handleLogoutClick}>Logout</NavItem> }
                    </Nav>

                    { Backend.isAuthenticated() && <Navbar.Text pullRight>Balance: {Backend.getBalance()}¤</Navbar.Text> }
                </Navbar>

                <Route exact path="/" component={Info} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/purchase" component={Purchase} />
            </div></Router>
        );
    }
}

export default App;
