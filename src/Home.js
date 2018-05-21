import React, { Component } from 'react';
import { Grid, Row, Alert, Button, ButtonToolbar } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
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
    );
  }
}

export default Home;
