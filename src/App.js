import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import Info from './Info';

class App extends Component {
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
                        <NavItem eventKey={1} href="/">Home</NavItem>
                        <NavItem eventKey={1} href="/info">Info</NavItem>
                        <NavItem eventKey={1} href="/profile">Profile</NavItem>
                        <NavItem eventKey={1} href="/admin">Admin</NavItem>
                        <NavItem eventKey={1} href="#">Logout</NavItem>
                    </Nav>
                </Navbar>

                <Route exact path="/" component={Home} />
                <Route exact path="/info" component={Info} />
                <Route exact path="/profile" component={Info} />
                <Route exact path="/admin" component={Info} />
            </div></Router>
    );
  }
}

export default App;
