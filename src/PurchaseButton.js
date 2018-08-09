import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Backend from './models/backend'

class PurchaseButton extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {show_confirmation : false, show_success : false, is_loading : false, show_failure : false, balance: Backend.getBalance()};
        this.handleClick = this.handleClick.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);
        this.handleConfirmationClose = this.handleConfirmationClose.bind(this);
        this.handleSuccessClose = this.handleSuccessClose.bind(this);
        this.handleFailureClose = this.handleFailureClose.bind(this);
        this.handleSuccessEvent = this.handleSuccessEvent.bind(this);
        this.handleFailureEvent = this.handleFailureEvent.bind(this);
    }

    handleSuccessEvent() {
        this.setState({ ...this.state, is_loading: false, show_confirmation: false, show_success: true });
    }

    handleBackendChange() {
        this.setState({ ...this.state, balance: Backend.getBalance() });
    }

    handleFailureEvent() {
        this.setState({ ...this.state, is_loading: false, show_confirmation: false, show_failure: true });
    }

    handleClick(e) {
        this.setState({ ...this.state, show_confirmation: true });
    }

    handlePurchase(e) {
        this.setState({ ...this.state, is_loading: true });
        Backend.purchase(this.props.item.id, this.handleSuccessEvent, this.handleFailureEvent);
    }

    handleConfirmationClose(e) {
        this.setState({ ...this.state, show_confirmation: false });
    }

    handleSuccessClose(e) {
        this.setState({ ...this.state, show_success: false });
    }

    handleFailureClose(e) {
        this.setState({ ...this.state, show_failure: false });
    }

    render() {
        return (
            <div>
                <Button disabled={this.state.balance < this.props.item.price} onClick={this.handleClick}>{this.props.item.name} ({this.props.item.price}¤)</Button>
                <Modal show={this.state.show_confirmation} onHide={this.handleConfirmationClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm your purchase</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Do you want to purchase one {this.props.item.name} for {this.props.item.price}¤?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleConfirmationClose}>Close</Button>
                        <Button onClick={this.handlePurchase} disabled={this.state.is_loading} bsStyle="primary">{ this.state.is_loading ? "loading.." : "Purchase"}</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.show_success} onHide={this.handleSuccessClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your purchase was successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You have successfully purchased one {this.props.item.name}.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleSuccessClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.show_failure} onHide={this.handleFailureClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your purchase failed. Try again later</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Your purchase failed. Try again later</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleFailureClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default PurchaseButton;
