import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import React from "react";
import {Link} from "react-router-dom";
import './Navigation.css'
import isLoggedIn from "./Session";

function Navigation() {
    let loggedIn = <Link className="nav-link" role="button" to="/login">로그인</Link>;

    isLoggedIn(true).then(() => {
        console.log('is logged in')
        loggedIn = <Link className="nav-link" role="button" to="/mypage">Mypage</Link>;
    }).catch(() => {
        console.log('is not logged in')
    })
    return (
        <Navbar bg="dark" expand="lg" variant="dark" sticky="top" fixed="top">
            <Navbar.Brand>NUMAZU.info</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-menus" />
            <Navbar.Collapse id="navbar-menus">
                <Nav className="mr-auto" id='navbar-menu-left'>
                    <Link className="nav-link" role="button" to="/">검색</Link>
                    <Link className="nav-link" role="button" to="/category">카테고리</Link>
                </Nav>
                <Nav className="mr-auto justify-content-end" id='navbar-menu-right'>
                    {loggedIn}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;