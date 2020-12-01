import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navigation.css'

class Navigation extends Component {
    render() {
        return (
            <div>
                <hr />
                <div className="navigation">
                    <Link to="/search" className="item">검색</Link>
                    <Link to="/board" className="item">자유게시판</Link>
                </div>
                <hr />
            </div>
        );
    }
}

export default Navigation;