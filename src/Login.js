import React from 'react';
import queryString from'query-string';
import Alert from "react-bootstrap/Alert";
import { useLastLocation } from 'react-router-last-location';

function Login({ location }) {
    const previous_page = useLastLocation();
    const query = queryString.parse(location.search);
    const hasError = 'error' in query && 'success';
    let alert_msg = null;
    if (hasError) {
        if (query['error'] === 'user_cancelled_grant') {
            alert_msg = <Alert variant="danger">사용자가 로그인 작업을 취소했습니다</Alert>;
        }
        else if (query['error'] === 'claiming_token_failed') {
            alert_msg = <Alert variant="danger">로그인 과정 중 문제가 발생했습니다</Alert>;
        }
        else if (query['error'] === 'wrong_attempt') {
            alert_msg = <Alert variant="danger">잘못된 요청입니다</Alert>
        }
        else if (query['error'] === 'new_user_fetching_profile_failed') {
            alert_msg = <Alert variant="danger">신규 유저 등록을 위한 추가 정보 요청에 실패했습니다</Alert>
        }
        else if (query['error'] === 'new_user_fetching_profile_failed') {
            alert_msg = <Alert variant="danger">요청 시간이 초과되었습니다.</Alert>
        }else if (query['error'] === 'captcha_verification_failed') {
            alert_msg = <Alert variant="danger">reCAPTCHA 인증에 실패했습니다</Alert>
        }
        else {
            alert_msg = <Alert variant="danger">로그인 과정 중 예상치 못한 문제가 발생했습니다</Alert>
        }
    }
    else {
        if (previous_page === null)
            window.sessionStorage.setItem('previous_page', '/')
        else if (previous_page.pathname !== '/login')
            window.sessionStorage.setItem('previous_page', previous_page.pathname);
        alert_msg = "";
    }
    return (
        <div id="login-intro" className="bg-light container-fluid text-center">
            <div className="col-12 bg-white rounded shadow" style={{marginTop: '1em'}}>
                {alert_msg}
                <h4 id="sign_in_title">로그인</h4>
                <p>아래 외부 서비스를 통해 로그인할 수 있습니다.</p>
                <a href={process.env.REACT_APP_API_ENDPOINT + "oauth/request/google"} className="btn" style={{padding: "0 0 0 0"}}><img src={process.env.PUBLIC_URL + '/sign_in_with_google.png'} height="48px" alt="Sign in with Google"/></a>
            </div>
        </div>
    )
}


export default Login;