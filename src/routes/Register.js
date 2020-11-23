import React, { Component } from 'react';
import firebase from '../firebase';

class Register extends Component {
    
    constructor() {
        super();
        this.ref = firebase.firestore().collection('user');
        this.unsubscribe = null;
        this.state = {
            id : '',
            pwd : '',
            name : '',
            manager : false
        }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { id, pwd, name, manager } = this.state;
        this.ref.doc(id).get()
        .then((doc) => {
            if(doc.exists){
                console.log("이미 있어~~");
            }else{
                this.ref.doc(id).set({
                    pwd,
                    name,
                    manager
                })
                .then((docRef) => {
                    this.setState({
                        id : '',
                        pwd : '',
                        name : '',
                    });
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                })
            }
        })
        .catch((error) => {
            console.error("Error!! : ", error);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>ID</label>
                        <input type="text" name="id" onChange={this.onChange} placeholder="input your ID" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="pwd" onChange={this.onChange} placeholder="input your Password"/>
                    </div>
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" onChange={this.onChange} placeholder="input your name" />
                    </div>
                    <div>
                        <label>Are you manager??</label>
                        <input type="radio" name="manager" value="true" onChange={this.onChange}/> Yes
                        <input type="radio" name="manager" value="false" onChange={this.onChange}/> no
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Register;