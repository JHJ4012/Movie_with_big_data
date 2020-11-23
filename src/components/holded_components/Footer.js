import React, { Component } from 'react';
import '../css/Footer.css'

class Footer extends Component {
    render() {
        return (
            <div className = "footer">
                <hr />
                <div className = "footer-text">
                    이 페이지는 영화 진흥 위원회의 open api를 사용하였습니다.
                </div>
            </div>
        );
    }
}

export default Footer;