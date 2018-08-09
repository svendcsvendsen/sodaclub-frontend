import { PURCHASE_PENDING, PURCHASE_SUCCESS, PURCHASE_ERROR } from "../constants/action_types";
import { UPDATE_PURCHASE_DIALOG } from "../constants/action_types";
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "../constants/action_types";
import { PASSWORD_RESET_PENDING, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_ERROR } from "../constants/action_types";
import { TOKEN_VERIFICATION_PENDING, TOKEN_VERIFICATION_SUCCESS, TOKEN_VERIFICATION_ERROR } from "../constants/action_types";
import { ITEMS_PENDING, ITEMS_SUCCESS, ITEMS_ERROR } from "../constants/action_types";

import { combineReducers } from 'redux';

function purchasePending(state = false, action) {
    switch (action.type) {
        case PURCHASE_PENDING:
            return true;
        case PURCHASE_SUCCESS:
            return false;
        case PURCHASE_ERROR:
            return false;
        default:
            return state;
    }
}

function purchaseError(state = null, action) {
    switch (action.type) {
        case PURCHASE_ERROR:
            return action.message;
        case PURCHASE_SUCCESS:
            return null;
        case PURCHASE_PENDING:
            return null;
        case UPDATE_PURCHASE_DIALOG:
            return null;
        default:
            return state;
    }
}

function balance(state = null, action) {
    switch (action.type) {
        case PURCHASE_SUCCESS:
            return action.balance;
        case LOGIN_SUCCESS:
            return action.balance;
        case PASSWORD_RESET_SUCCESS:
            return action.balance;
        case LOGOUT:
            return null;
        case TOKEN_VERIFICATION_SUCCESS:
            return action.balance;
        default:
            return state;
    }
}

function loginPending(state = false, action) {
    switch (action.type) {
        case LOGIN_PENDING:
            return true;
        case LOGIN_SUCCESS:
            return false;
        case LOGIN_ERROR:
            return false;
        default:
            return state;
    }
}

function loginError(state = null, action) {
    switch (action.type) {
        case LOGIN_ERROR:
            return action.message;
        case LOGIN_SUCCESS:
            return null;
        case LOGIN_PENDING:
            return null;
        default:
            return state;
    }
}

function passwordResetPending(state = false, action) {
    switch (action.type) {
        case PASSWORD_RESET_PENDING:
            return true;
        case PASSWORD_RESET_SUCCESS:
            return false;
        case PASSWORD_RESET_ERROR:
            return false;
        default:
            return state;
    }
}

function passwordResetError(state = null, action) {
    switch (action.type) {
        case PASSWORD_RESET_ERROR:
            return action.message;
        case PASSWORD_RESET_SUCCESS:
            return null;
        case PASSWORD_RESET_PENDING:
            return null;
        default:
            return state;
    }
}

function tokenVerificationPending(state = false, action) {
    switch (action.type) {
        case TOKEN_VERIFICATION_PENDING:
            return true;
        case TOKEN_VERIFICATION_SUCCESS:
            return false;
        case TOKEN_VERIFICATION_ERROR:
            return false;
        default:
            return state;
    }
}

function token(state = null, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.token;
        case PASSWORD_RESET_SUCCESS:
            return action.token;
        case LOGOUT:
            return null;
        case TOKEN_VERIFICATION_SUCCESS:
            return action.token;
        default:
            return state;
    }
}

function id(state = null, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.id;
        case PASSWORD_RESET_SUCCESS:
            return action.id;
        case LOGOUT:
            return null;
        case TOKEN_VERIFICATION_SUCCESS:
            return action.id;
        default:
            return state;
    }
}

function itemsPending(state = false, action) {
    switch (action.type) {
        case ITEMS_PENDING:
            return true;
        case ITEMS_SUCCESS:
            return false;
        case ITEMS_ERROR:
            return false;
        default:
            return state;
    }
}

function itemsError(state = null, action) {
    switch (action.type) {
        case ITEMS_ERROR:
            return action.message;
        case ITEMS_SUCCESS:
            return null;
        case ITEMS_PENDING:
            return null;
        default:
            return state;
    }
}

function items(state = [], action) {
    switch (action.type) {
        case ITEMS_SUCCESS:
            return action.items;
        case LOGOUT:
            return null;
        default:
            return state;
    }
}

function purchaseDialogId(state = null, action) {
    switch (action.type) {
        case UPDATE_PURCHASE_DIALOG:
            return action.id;
        case PURCHASE_SUCCESS:
            return null;
        default:
            return state;
    }
}

export default combineReducers({
    purchasePending,
    purchaseError,
    purchaseDialogId,
    balance,
    loginPending,
    loginError,
    passwordResetPending,
    passwordResetError,
    tokenVerificationPending,
    token,
    id,
    itemsPending,
    itemsError,
    items,
});

