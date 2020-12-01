import React, { Component } from 'react';
import firebase from '../firebase';
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import './css/Register.css'

class Register extends Component {
    
    constructor() {
        super();
        this.state = {
            email : '',
            password : ''
        }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            var user = firebase.auth().currentUser;
            this.setState({
                logged : user
            })
            if(user.displayName == null){
                this.props.history.push('/profile');
            }
        })
        .catch((error) => {
            console.log("회원가입에 실패하였습니다");
        })
    }

    render() {
        return (
            <div className = "register">
                <div className="register_screen">
                    <form onSubmit={this.onSubmit}>
                        <Paper className="input_paper">
                            <div>
                                <InputBase type="email" name="email" onChange={this.onChange} placeholder="email" className="input_register"/>
                            </div>
                            <div>
                                <InputBase type="password" name="password" onChange={this.onChange} placeholder="password" className="input_register"/>
                            </div>
                            <div className="register_button">
                                <Button type="submit">회원가입 하기</Button>
                            </div>
                        </Paper>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;