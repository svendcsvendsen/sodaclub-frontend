import React, { Component } from 'react';
import { Grid, Row, Alert, Button, ButtonToolbar } from 'react-bootstrap';

class Purchase extends Component {
  render() {
    return (
        <Grid>
            <Row>
                <Alert>This is some info</Alert>
                <h2>Your current balance is 100¤</h2>
                <ButtonToolbar>
                <Button>Soda (2¤)</Button>
                <Button>Sun Lolly (3¤)</Button>
                </ButtonToolbar>
            </Row>
        </Grid>
    );
  }
}

export default Purchase;
