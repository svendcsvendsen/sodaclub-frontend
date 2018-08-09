import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "../constants/action_types";
import { PASSWORD_RESET_PENDING, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_ERROR } from "../constants/action_types";
import { TOKEN_VERIFICATION_PENDING, TOKEN_VERIFICATION_SUCCESS, TOKEN_VERIFICATION_ERROR } from "../constants/action_types";

import { BASE_URL, CONNECTION_ERROR_MESSAGE } from "../constants/backend.js"

export function loginPending() {
    return {
        type: LOGIN_PENDING,
    };
}

export function loginSuccess(balance, id, token) {
    return {
        type: LOGIN_SUCCESS,
        balance: balance,
        token: token,
        id: id,
    };
}

export function loginError(message) {
    return {
        type: LOGIN_ERROR,
        message: message,
    };
}

export function login(email, password) {
    return (dispatch) => {
        dispatch(loginPending());

        const data = {email: email, password: password};
        const headers = new Headers({'Content-Type': 'application/json'})
        const url = BASE_URL + '/users/login';

        fetch(url, {method: 'POST', headers: headers, body: JSON.stringify(data)}).then((response) => {
            response.json().then((data) => {
                if (response.status === 200)
                    dispatch(loginSuccess(data.balance, data.id, data.token));
                else
                    dispatch(loginError(data.error));

            });
        }).catch((err) => {
            dispatch(loginError(CONNECTION_ERROR_MESSAGE));
        });
    };
}

export function passwordResetPending() {
    return {
        type: PASSWORD_RESET_PENDING,
    };
}

export function passwordResetSuccess(balance, id, token) {
    return {
        type: PASSWORD_RESET_SUCCESS,
        balance: balance,
        token: token,
        id: id,
    };
}

export function passwordResetError(message) {
    return {
        type: PASSWORD_RESET_ERROR,
        message: message,
    };
}

export function resetPassword(user_id, reset_key, password) {
    return (dispatch) => {
        dispatch(passwordResetPending());

        const data = {reset_key: reset_key, password: password};
        const headers = new Headers({'Content-Type': 'application/json'})
        const url = BASE_URL + '/users/' + user_id + '/password_reset';

        fetch(url, {method: 'POST', headers: headers, body: JSON.stringify(data)}).then((response) => {
            response.json().then((data) => {
                if (response.status === 200)
                    dispatch(passwordResetSuccess(data.balance, data.id, data.token));
                else
                    dispatch(passwordResetError(data.error));

            });
        }).catch((err) => {
            dispatch(passwordResetError(CONNECTION_ERROR_MESSAGE));
        });
    };
}


export function logout() {
    return {
        type: LOGOUT,
    };
}

export function tokenVerificationPending() {
    return {
        type: TOKEN_VERIFICATION_PENDING,
    };
}

export function tokenVerificationSuccess(balance, id, token) {
    return {
        type: TOKEN_VERIFICATION_SUCCESS,
        balance: balance,
        token: token,
        id: id,
    };
}

export function tokenVerificationError(message) {
    return {
        type: TOKEN_VERIFICATION_ERROR,
        message: message,
    };
}

export function verifyToken(user_id, token) {
    return (dispatch) => {
        dispatch(tokenVerificationPending());

        const headers = new Headers({'Authorization': 'Bearer ' + token})
        const url = BASE_URL + '/users/' + user_id;

        fetch(url, {method: 'GET', headers: headers}).then((response) => {
            response.json().then((data) => {
                if (response.status === 200)
                    dispatch(tokenVerificationSuccess(data.balance, data.id, token));
                else
                    dispatch(tokenVerificationError(data.error));

            });
        }).catch((err) => {
            dispatch(tokenVerificationError(CONNECTION_ERROR_MESSAGE));
        });
    };
}
