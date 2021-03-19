export default class AuthenticationService {

    static isAuthenticated = false;
    static token = null;

    static login(username, password) {
        var isAuthenticated = false;
        var token = null;

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let data = JSON.stringify({
            "username": username,
            "password": password
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        fetch('http://localhost:7029/login', requestOptions)
        .then(response => response.json())
        .then(response => {
            isAuthenticated = response.isAuthenticated
            token = response.token
        })
        .catch(error => console.log('error', error));

        return new Promise(resolve => {
            setTimeout(() => {
                this.isAuthenticated = isAuthenticated;
                this.token = token
                resolve(isAuthenticated);
            }, 1000);
        });
    }
}