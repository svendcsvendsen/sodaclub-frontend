import React, { Component } from 'react';
import { Grid, Row, Button, ButtonToolbar } from 'react-bootstrap';
import Backend from './models/backend'

class Purchase extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {items : []};
        Backend.getItems((items) => {
            this.state.items = items;
            this.setState(this.state);
        }, () => {
            // failure 
        });
    }

    render() {
        const items = this.state.items.map((item) =>
            <Button key={item.id}>{item.name} ({item.price}¤)</Button>
        );

        return (
            <Grid>
                <Row>
                    <h1>Purchase Items</h1>
                    <ButtonToolbar>{items}</ButtonToolbar>
                </Row>
            </Grid>
        );
    }
}

export default Purchase;
