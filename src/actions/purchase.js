import { PURCHASE_PENDING, PURCHASE_SUCCESS, PURCHASE_ERROR } from "../constants/action_types";
import { UPDATE_PURCHASE_DIALOG } from "../constants/action_types";
import { BASE_URL, CONNECTION_ERROR_MESSAGE } from "../constants/backend.js"

export function purchasePending() {
    return {
        type: PURCHASE_PENDING,
    };
}

export function purchaseSuccess(balance) {
    return {
        type: PURCHASE_SUCCESS,
        balance: balance,
    };
}

export function purchaseError(message) {
    return {
        type: PURCHASE_ERROR,
        message: message,
    };
}

export function updatePurchaseDialog(id) {
    return {
        type: UPDATE_PURCHASE_DIALOG,
        id: id,
    };
}

export function hidePurchaseDialog() {
    return {
        type: UPDATE_PURCHASE_DIALOG,
        id: null,
    };
}

export function purchase(id, token) {
    return (dispatch) => {
        dispatch(purchasePending(id));

        const headers = new Headers({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
        const url = BASE_URL + '/items/' + id + '/purchase';

        fetch(url, {method: 'POST', headers: headers}).then((response) => {
            response.json().then((data) => {
                if (response.status === 200)
                    dispatch(purchaseSuccess(data.balance));
                else
                    dispatch(purchaseError(data.error));

            });
        }).catch((err) => {
            dispatch(purchaseError(CONNECTION_ERROR_MESSAGE));
        });
    };
}

