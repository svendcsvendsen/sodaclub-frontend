import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { updatePurchaseDialog } from './actions/purchase';

const mapStateToProps = (state) => {
    return {
        balance: state.balance,
        token: state.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePurchaseDialog: (id) => dispatch(updatePurchaseDialog(id)),
    };
};

class PurchaseButton extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.updatePurchaseDialog(this.props.item.id);
    }

    render() {
        return (<Button disabled={this.props.balance < this.props.item.price} onClick={this.handleClick}>{this.props.item.name} ({this.props.item.price}¤)</Button>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseButton);
