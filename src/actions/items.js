import { ITEMS_PENDING, ITEMS_SUCCESS, ITEMS_ERROR } from "../constants/action_types";

import { BASE_URL, CONNECTION_ERROR_MESSAGE } from "../constants/backend.js"

export function itemsPending() {
    return {
        type: ITEMS_PENDING,
    };
}

export function itemsSuccess(items) {
    return {
        type: ITEMS_SUCCESS,
        items: items,
    };
}

export function itemsError(message) {
    return {
        type: ITEMS_ERROR,
        message: message,
    };
}

export function fetchItems(token) {
    console.log("Fetching items")
    return (dispatch) => {
        dispatch(itemsPending());

        const headers = new Headers({'Authorization': 'Bearer ' + token})
        const url = BASE_URL + '/items/';

        fetch(url, {method: 'GET', headers: headers}).then((response) => {
            response.json().then((data) => {
                if (response.status === 200)
                    dispatch(itemsSuccess(data));
                else
                    dispatch(itemsError(data.error));
            });
        }).catch((err) => {
            dispatch(itemsError(CONNECTION_ERROR_MESSAGE));
        });
    };
}
