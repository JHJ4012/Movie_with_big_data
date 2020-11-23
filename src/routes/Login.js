import React, { Component } from 'react';
import firebase from '../firebase';

class Login extends Component {
    
    constructor() {
        super();
        this.ref = firebase.firestore().collection('user');
        this.unsubscribe = null;
        this.state = {
            id : '',
            pwd : '',
        }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { id, pwd} = this.state;
        this.ref.doc(id).get()
        .then((doc) => {
            if(doc.exists && pwd === doc.data().pwd){
                console.log("로그인 성공")
            }else{
                console.log("로그인 실패")
            }
        })
        .catch((error) => {
            console.error("Error : " , error);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>ID</label>
                        <input type="text" name="id" onChange={this.onChange} placeholder="id" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="pwd" onChange={this.onChange} placeholder="password"/>
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;