import React, { Component } from 'react';
import { Grid, Row, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import PurchaseItem from './PurchaseItem';

import { connect } from 'react-redux';
import { fetchItems } from './actions/items';
import { purchase, hidePurchaseDialog } from './actions/purchase';

const mapStateToProps = (state) => {
    return {
        items: state.items.filter(item => item.enabled),
        itemsPending: state.itemsPending,
        itemsError: state.itemsError,
        token: state.token,
        purchaseDialogId: state.purchaseDialogId,
        purchasePending: state.purchasePending,
        purchaseError: state.purchaseError,
        item: state.purchaseDialogId === null ? null : state.items.find((item) => (item.id === state.purchaseDialogId)),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchItems: (token) => dispatch(fetchItems(token)),
        hidePurchaseDialog: () => dispatch(hidePurchaseDialog()),
        purchase: (id, token) => dispatch(purchase(id, token)),
    };
};

class Purchase extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleModalHide = this.handleModalHide.bind(this);
        this.handleModalPurchase = this.handleModalPurchase.bind(this);
    }

    componentDidMount() {
        if (this.props.items.length === 0) {
            this.props.fetchItems(this.props.token);
        }
    }


    handleModalHide() {
        this.props.hidePurchaseDialog();
    }

    handleModalPurchase() {
        this.props.purchase(this.props.purchaseDialogId, this.props.token);
    }

    render() {
        const items = this.props.items.map((item) => <PurchaseItem key={item.id} item={item} />);

        return (
            <Grid>
                <Row>
                    <h2>Purchase Items</h2>
                    {items}
                </Row>
                <Modal show={this.props.purchaseDialogId !== null} onHide={this.handleModalHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm your purchase</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Do you want to purchase one {this.props.item !== null ? this.props.item.name : null} for {this.props.item !== null ? this.props.item.price/100 : null} DKK?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleModalHide}>Close</Button>
                        <Button onClick={this.handleModalPurchase} disabled={this.props.purchasePending} bsStyle="primary">{ this.props.purchasePending ? "purchasing.." : "Purchase"}</Button>
                    </Modal.Footer>
                </Modal>
            </Grid>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
