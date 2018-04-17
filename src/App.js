import React, { Component } from 'react';
import { Grid, Navbar, NavItem, Nav, Row, Alert, Button, ButtonToolbar } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Sodaclub</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">Home</NavItem>
                    <NavItem eventKey={1} href="#">Info</NavItem>
                    <NavItem eventKey={1} href="#">Profile</NavItem>
                    <NavItem eventKey={1} href="#">Admin</NavItem>
                    <NavItem eventKey={1} href="#">Logout</NavItem>
                </Nav>
            </Navbar>
            <Grid>
                <Row>
                    <Alert>This is some info</Alert>
                    <h2>Your current balance is 100 DKK</h2>
                    <ButtonToolbar>
                    <Button>Soda (2 DKK)</Button>
                    <Button>Candybar (3 DKK)</Button>
                    </ButtonToolbar>
                </Row>
            </Grid>
        </div>
    );
  }
}

export default App;
