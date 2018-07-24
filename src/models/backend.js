const BASE_URL = '/api';

class Backend {
    static isAuthenticated() {
        return localStorage.getItem("token") !== ""
    }

    static authenticate(email, password, success, failure) {
        // localStorage.setItem("token", "token");
        const data = {email: email, password: password};
        const headers = new Headers({'Content-Type': 'application/json'})

        fetch(BASE_URL + '/users/login', {method: 'POST', headers: headers, body: JSON.stringify(data)}).then((response) => {
            if (response.status !== 200) {
                failure();
                return;
            }

            response.json().then((data) => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("balance", data.balance);
                success();
                return;
            });
        }).catch((err) => {
            failure();
        })
    }

    static signout(success) {
        localStorage.setItem("token", "")
        localStorage.setItem("balance", "")
        success();
    }

    static getBalance() {
        return localStorage.getItem("balance")
    }

    static getItems(success, failure) {
        const headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('token')})
        fetch(BASE_URL + '/items/', {method: 'GET', headers: headers}).then((response) => {
            if (response.status !== 200) {
                failure();
                return;
            }

            response.json().then((data) => {
                success(data);
                return;
            });
        }).catch((err) => {
            failure();
        })
    }
}

export default Backend
