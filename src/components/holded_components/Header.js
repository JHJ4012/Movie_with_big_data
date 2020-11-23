import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../css/Header.css'

class Header extends Component {
    render() {
        return (
            <div>
                <div className = "header">
                    <Link to = "/" className = "header_title"><h1>Movie_with_big_data</h1></Link>
                </div>
                <div>
                    <Link to = "/register" className = "register">회원가입</Link>
                    <Link to = "/login" className = "login">로그인</Link>
                </div>
            </div>
        );
    }
}

export default Header;