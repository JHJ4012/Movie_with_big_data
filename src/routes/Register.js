import React, { Component } from 'react';
import firebase from '../firebase';

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
            console.log("이미 존재하는 이메일입니다");
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" onChange={this.onChange} placeholder ="email"/>
                    </div>
                    <div>
                        <label>password</label>
                        <input type="password" name="password" onChange={this.onChange} placeholder="password"/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Register;