import React, { Component } from 'react';
import './css/Main.css'
import { Link, Redirect } from 'react-router-dom'
import firebase from '../firebase';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged : '',
            email : '',
            password : '',
            message : '',
        }
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    logged : user
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

    logout(e){
        e.preventDefault();
        if (this.state.logged != null){
            firebase.auth().signOut()
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
        firebase.auth().signInWithEmailAndPassword(email, password)
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
            alert("아이디나 비밀번호를 확인하세요.")
        })
    }

    gLogin = (e) => {
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
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
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <label>ID</label>
                                <input type="email" name="email" onChange={this.onChange} placeholder="email" />
                            </div>
                            <div>
                                <label>Password</label>
                                <input type="password" name="password" onChange={this.onChange} placeholder="password"/>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                        <div>
                            <button onClick={this.gLogin}>구글 로그인</button>
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
                    <div>
                        <Link to = "/" className="logout" onClick={this.logout}>로그아웃</Link>
                    </div>
                }
            </div>
        );
    }
}

export default Main;