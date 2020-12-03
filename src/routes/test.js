import React, { Component } from 'react';
import firebase from '../firebase';

class test extends Component {
    
    constructor() {
        super();
        this.state = {
            file : null,
            url : ''
        }
    }    
    
    onChange = (e) => {
        console.log(e.target.files[0])
        this.setState({
            file : e.target.files[0]
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { file } = this.state;
        firebase.storage().ref().child(`images/${this.state.file.name}`).put(file)
        .then((snapshot) => {
            console.log(snapshot);
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    test = () => {
        firebase.storage().ref().child('images/KakaoTalk_20200312_153434886.jpg').getDownloadURL()  //photo 가져오는거
        .then((url) => {
            this.setState({
                url : url
            })
            console.log(url)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="file" accept="image/*" name="file" onChange = {this.onChange}/>
                    <button type="submit">제출</button>
                </form>
                <button onClick={this.test}>사진 출력</button>
                <img src = {this.state.url}></img>
            </div>
        );
    }
}

export default test;