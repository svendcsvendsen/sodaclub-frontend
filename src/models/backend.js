const backend = {
    isAuthenticated() {
        console.log(localStorage.getItem("token"), localStorage.getItem("token") != "")
        return localStorage.getItem("token") != ""
    },
    authenticate(cb) {
        localStorage.setItem("token", "token");
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        localStorage.setItem("token", "")
        setTimeout(cb, 100) // fake async
    }
}

export default backend
