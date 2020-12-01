import React, { Component } from 'react';
import firebase from '../firebase';
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import './css/Profile.css'

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
            <div className = "profile">
                <div className = "profile_screen">
                    <form onSubmit={this.onSubmit}>
                        <div className = "description_profile">
                            <h2>닉네임을 입력하세요</h2>
                        </div>
                        <Paper className="input_paper">
                            <div>
                                <InputBase type="text" name="name" onChange={this.onChange} placeholder="name" className="input_profile"/>
                            </div>
                            <div className="register_button">
                                <Button type="submit">닉네임 입력하기</Button>
                            </div>
                        </Paper>
                    </form>
                </div>

            </div>
        );
    }
}

export default Profile;