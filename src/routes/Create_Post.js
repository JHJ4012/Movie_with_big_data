import React, { Component } from 'react';
import firebase from '../firebase';

class Create_Post extends Component {
    
    constructor() {
        super();
        this.state = {
            user_id : '',
            user_name : '',
            title : '',
            content : '',
            photo : ''
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
               this.setState({
                   user_id : user.uid,
                   user_name : user.displayName
               })
            }
        })
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { title, content, user_id, user_name, photo} = this.state;
        firebase.firestore().collection('Post').doc().set({
            user_id: user_id,
            user_name : user_name,
            title : title,
            content : content,
            created_date : new Date(),
            modified_date : new Date(),
            Photo : photo
        })
        .then(() => {
            this.props.history.goBack();
        })
    }

    render() {
        return (
            <div className = "entire_post">
                <form onSubmit={this.onSubmit}>
                    <div className = "title_user_name">
                        <p className = "title_label">제목</p>
                        <textarea type="text" name="title" onChange={this.onChange} className = "post_title" />
                    </div>
                    <div>
                        <p>내용</p>
                        <textarea name="content" onChange={this.onChange} className = "post_content" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Create_Post;