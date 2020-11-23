import React, { Component } from 'react';
import './css/Main.css'

class Main extends Component {
    render() {
        return (
            <div className="main">
                <div className = "show_function">
                    <p>이 페이지에서 제공하는 기능</p>
                    <ul>
                        <li>원하는 키워드로 영화와 관련된 정보를 검색해보세요!</li>
                        <li>박스오피스 목록을 조회해보세요!</li>
                    </ul>
                </div>
                <br />
                <div className = "show_developer">
                    <p>개발자 소개</p>
                    <ul>
                        <li>영진전문대학교 2WDJ 정현재</li>
                        <li>빅데이터 연습 중</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Main;