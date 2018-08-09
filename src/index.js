import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import configureStore from "./store/index";
import { verifyToken } from "./actions/authentication";
import { Provider } from "react-redux"

import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore();

const token = localStorage.getItem('token');
const id = localStorage.getItem('id');

if (token !== null && id !== null) {
    store.dispatch(verifyToken(id, token));
}

var last_token = null;

store.subscribe(function() {
    const state = store.getState()
    const id = state.id
    const token = state.token

    if (last_token !== token) {
        console.log('Saving token ' + token);
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        last_token = token;
    }
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
