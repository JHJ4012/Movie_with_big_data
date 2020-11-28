import React, { Component } from 'react';
import firebase from '../firebase';

class Board extends Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            list : []
        }
    }

    componentDidMount(){
        this._isMounted = true;
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                console.log(user);
            }else{
                if(this.props.history.location.pathname == '/board'){
                    alert("로그인이 필요한 서비스입니다.")
                    this.props.history.replace('/');
                }
            }
        })
        var post_list = []
        firebase.firestore().collection('Post').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                var post = {}
                post.id = doc.id;
                post.user_id = doc.data().user_id;
                post.title = doc.data().title;
                post.content = doc.data().content;
                post.photo = doc.data().photo;
                post.created_date = doc.data().created_date;
                post.modified_date = doc.data().modified_date;
                post_list.push(post)
            })
            this.setState({
                list : post_list
            })
            console.log(this.state.list);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Board;