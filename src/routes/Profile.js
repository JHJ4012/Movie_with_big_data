import React, { Component } from 'react';
import firebase from '../firebase';

class Profile extends Component {
    
    constructor() {
        super();
        this.state = {
            name : ''
        }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        var user = firebase.auth().currentUser;
        var {name} = this.state;
        if(user != null){
            console.log(name);
            user.updateProfile({
                displayName : name
            })
            .then(() => {
                this.props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
            })
        }else{
            console.log("로그인 안되있다")
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" onChange={this.onChange} placeholder="name" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Profile;