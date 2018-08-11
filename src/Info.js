import React, { Component } from 'react';
import { Row, Grid } from 'react-bootstrap';
import { CONTACT_PERSON, CONTACT_PHONE, CONTACT_EMAIL, CONTACT_OFFICE } from './constants/contact_info';

class Info extends Component {
  render() {
    return (
        <Grid>
            <Row>
                <h1>Madalgo Soda Club</h1>
                <h3>How do I join the Sodaclub?</h3>
                <p>The Madalgo Soda Club is run by {CONTACT_PERSON}. You can join by sending a mail to <a href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a> or stopping by my office at {CONTACT_OFFICE}.</p>
                <h3>How do i purchase items?</h3>
                <p>The Soda Club stocks different types of soft drinks, ice cream and chocolate bars. Items are purchased through the web interface. You deposit money either by MobilePay to {CONTACT_PHONE} or bills.</p>
            </Row>
        </Grid>
    );
  }
}

export default Info;
