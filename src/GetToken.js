import React from "react";
import { Redirect } from "react-router-dom";
import queryString from'query-string';
import './Navigation.css'
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import axios from 'axios';


function GetToken({ location }) {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const query = queryString.parse(location.search);
    if (!('key' in query)) {
        return (
            <Redirect to='/login?error=wrong_attempt'/>
        )
    }
    executeRecaptcha('issue_token').then((recaptcha_token) => {
        let data = {
            key: query.key,
            recaptcha: recaptcha_token
        }
        axios.post(process.env.REACT_APP_API_ENDPOINT + "token/issue", data, {withCredentials: true})
            .then( (resp) => {
                window.localStorage.setItem('token', resp.data.token);
                window.localStorage.setItem('expiration', resp.data.expiration);
                window.localStorage.setItem('permissions', resp.data.permissions);

                let previous_page = window.sessionStorage.getItem('previous_page');

                if (!previous_page)
                    previous_page = '/';
                else
                    window.sessionStorage.removeItem('previous_page');

                window.location = previous_page;
            }).catch((err) => {
            if (err.response)
                window.location = '/login?error=' + err.response.data.error;
            else
                window.location = '/login?error=claiming_token_failed';
        })
    }).catch(() => {
        window.location = '/login?error=captcha_verification_failed';
    })

    return (
        <div id="login-issue-token" className="bg-light container-fluid text-center">
            <div className="col-12 bg-white rounded shadow" style={{marginTop: '1em'}}>
                <p>로그인 중입니다...</p>
            </div>
        </div>
    );
}

export default GetToken;