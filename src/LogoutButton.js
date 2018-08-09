import React, { Component } from 'react';
import { NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { logout } from './actions/authentication';

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
};

class LogoutButton extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.logout();
    }

    render() {
        return (
            <NavItem onClick={this.handleClick}>Logout</NavItem>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
