import React, { Component } from 'react';
import './css/Main.css'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import firebase from '../firebase';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name : '',
            logged : '',
            email : '',
            password : '',
            message : '',
        }
        this.logout = this.logout.bind(this);   //메서드에서 setState 사용하기 위해서
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {  //로그인 여부 체크 및 사용자 정보 데이터 초기화
            if(user){
                this.setState({
                    logged : user,
                    user_name : user.displayName
                })
            }else{
                this.setState({
                    logged : null
                })
            }
        })
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    logout = (e) => {
        e.preventDefault();
        if (this.state.logged != null){
            firebase.auth().signOut()   //로그아웃
            .then(() => {
                this.setState({
                    logged : null
                })
                console.log("success")
            }).catch((error) => {
                console.log(error)
            });
        }else{
            console.log("로그인 안되있는 상태")
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password) //이메일과 비밀번호로 로그인
        .then(() => {
            var user = firebase.auth().currentUser;
            this.setState({
                message : '',
                logged : user
            })
            if(user.displayName == null){
                this.props.history.push('/profile');    //사용자 닉네임 설정 화면으로 이동
            }
        })
        .catch((error) => {
            alert("아이디나 비밀번호를 확인하세요.")
        })
    }

    gLogin = (e) => {
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();  //구글 로그인을 위해 객체 생성
        firebase.auth().signInWithPopup(provider)
        .then(() => {
            var user = firebase.auth().currentUser;
            this.setState({
                message : '',
                logged : user
            })
            if(user.displayName == null){
                this.props.history.push('/profile');
            }
        })
        .catch((error) => {
            alert("로그인에 실패하였습니다.")
        })
    }
    render() {
        return (
            <div>
                {this.state.logged == null &&
                    <div className="login_screen">
                        <form onSubmit={this.onSubmit}>
                            <Paper className="input_paper">
                                <div>
                                    <InputBase type="email" name="email" onChange={this.onChange} placeholder="email" className="input_login"/>
                                </div>
                                <div>
                                    <InputBase type="password" name="password" onChange={this.onChange} placeholder="password" className="input_login"/>
                                </div>
                                <div className="login_button">
                                    <Button type="submit"  className="submit_button">로그인 하기</Button>
                                </div>
                            </Paper>
                        </form>
                        <div className="google">
                            <Button onClick={this.gLogin} variant = "contained" color="primary" >구글 로그인</Button>
                        </div>
                        <div>
                            <Link to = "/register" className="register">새로운 회원으로 로그인하기</Link>
                        </div>
                        <div>
                            {this.state.message}
                        </div>
                    </div>
                }
                {this.state.logged != null &&
                    <div className="logout">
                        <div className = "description">
                            <p className="welcome_notice">{this.state.user_name}님 환영합니다</p>
                            <p>
                                영화 제목, 영화인, 영화사를 검색하여 원하는 정보를 얻어가세요!! <br/>
                                자유게시판에서 영화에 대한 정보를 공유하는 기능도 있습니다!!
                            </p>
                        </div>
                        <Button to = "/" className="logout" onClick={this.logout} variant = "contained" color="secondary" >로그아웃</Button>
                    </div>
                }
            </div>
        );
    }
}

export default Main;