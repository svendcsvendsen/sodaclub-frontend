import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Purchase extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {items : []};
    }

    render() {
        return (
            <Button>{this.props.name} ({this.props.price}¤)</Button>
        );
    }
}

export default Purchase;
