import axios from 'axios';

function isLoggedIn(validate_token) {
    if (validate_token === undefined) {
        validate_token = false;
    }

    let token = window.localStorage.getItem('token')
    if (token === null)
        return new Promise((resolve, reject) => {
            reject();
        });
    if (!validate_token)
        return new Promise((resolve, reject) => {
            resolve();
        });
    else {
        return axios.post(process.env.REACT_APP_API_ENDPOINT + "token/validate", {token: token}).catch(() => {
            clearSession();
        })
    }
}

function clearSession() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expiration');
    window.localStorage.removeItem('permissions');
}

export default isLoggedIn;