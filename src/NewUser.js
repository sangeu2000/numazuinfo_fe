import React from 'react';
import Redirect from 'react-router-dom/Redirect';
import queryString from'query-string';
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import ServiceAndPrivacyPolicyBody from './ServiceAndPrivacyPolicy'
import axios from 'axios';
import { withGoogleReCaptcha } from "react-google-recaptcha-v3";

class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.query = queryString.parse(this.props.location.search);
        this.hasError = !('name' in this.query) || !('email' in this.query) || !('token' in this.query) || false;
        let name = '';
        if ('name' in this.query) {
            name = this.query['name'];
        }
        this.state = {
            modal_show: false,
            name: name
        };
    }
    handleClose = () => {
        this.setState({modal_show: false});
    }
    handleShow = () => {
        this.setState({modal_show: true});
    }

    handleNameChange = (e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength)
        }
        this.setState({name: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.googleReCaptchaProps.executeRecaptcha('register'));
        this.props.googleReCaptchaProps.executeRecaptcha('register').then((captcha_token) => {
            let data = {
                name: this.state.name,
                token: this.query.token,
                recaptcha: captcha_token
            }
            axios.post(process.env.REACT_APP_API_ENDPOINT + "account/register", data, {withCredentials: true})
                .then( (resp) => {
                    window.location = resp.data.redirect;
                }).catch(() => {
                    window.location = '/login?error=wrong_attempt'
            })
        }).catch(() => {
            window.location = '/login?error=captcha_verification_failed'
        })

    }

    render = () => {
        if (this.hasError) {
            return (
                <Redirect to='/login?error=wrong_attempt'/>
            )
        }

        return (
            <div id="login-new-user" className="bg-light container-fluid text-center">
                <div className="col-12 bg-white rounded shadow" style={{marginTop: '1em'}}>
                    <h4 id="sign_in_title">신규 유저 등록</h4>
                    <p>&nbsp;</p>
                    <p>아래 자동으로 가져와진 정보가 올바른지 확인해주세요.</p>
                    <p>이름은 실명이 아니어도 무방하나, 모든 사람에게 공개되며 추후 변경이 불가능합니다.</p>
                    <p>이메일은 인증된 구글 계정의 이메일을 사용하며, 변경할 수 없습니다.</p>
                    <p>&nbsp;</p>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="joinForm.Google.Email">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type="email" value={this.query['email']} readOnly="" disabled/>
                        </Form.Group>
                        <Form.Group controlId="joinForm.Google.Name">
                            <Form.Label>이름</Form.Label>
                            <Form.Control type="text" defaultValue={this.query['name']} maxLength="30" onChange={this.handleNameChange}/>
                        </Form.Group>
                        <p>아래 등록 버튼을 눌러 진행함으로서 <a href="#" onClick={this.handleShow}>이용약관 및 개인정보 처리 방침</a>에 동의한 것으로 간주합니다.</p>
                        <Button variant="primary" type="submit">등록</Button>
                    </Form>
                </div>
                <Modal show={this.state.modal_show} onHide={this.handleClose} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>이용약관 및 개인정보 처리 방침</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ServiceAndPrivacyPolicyBody/>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const NewUserCaptcha = withGoogleReCaptcha(NewUser);

export default NewUserCaptcha;