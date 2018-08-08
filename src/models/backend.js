const BASE_URL = '/api';

var subscribers = []

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
                this.publish();
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
        this.publish();
    }

    static reset_password(user_id, reset_key, password, success, failure) {
        // localStorage.setItem("token", "token");
        const data = {reset_key: reset_key, password: password};
        const headers = new Headers({'Content-Type': 'application/json'})

        fetch(BASE_URL + '/users/' + user_id + '/password_reset', {method: 'POST', headers: headers, body: JSON.stringify(data)}).then((response) => {
            if (response.status !== 200) {
                failure();
                return;
            }

            response.json().then((data) => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("balance", data.balance);
                success();
                this.publish();
                return;
            });
        }).catch((err) => {
            failure();
        })
    }


    static getBalance() {
        return localStorage.getItem("balance")
    }

    static publish() {
        console.log('Calling subscribers')
        for (var subscriber of subscribers) {
            console.log('Calling subscriber')
            subscriber();
        }
        console.log('Done')
    }

    static subscribe(subscriber) {
        console.log('Someone subscribes')
        subscribers.push(subscriber)
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

    static purchase(id, success, failure) {
        const headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('token')})
        fetch(BASE_URL + '/items/' + id + '/purchase', {method: 'POST', headers: headers}).then((response) => {
            if (response.status !== 200) {
                console.log("Returning failure")
                failure();
                return;
            }

            response.json().then((data) => {
                localStorage.setItem("balance", data.balance)
                success();
                this.publish();
                return;
            });
        }).catch((err) => {
            failure();
        })
    }
}

export default Backend
