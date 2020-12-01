import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom'
import './css/Detail_Post.css'

class Detail_Post extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        console.log(this.props.location.state.user_name);
        this.state = {
            post_id : this.props.location.state.id,
            user_name : this.props.location.state.user_name,
            title : this.props.location.state.title,
            content : this.props.location.state.content,
            cur_user : ''
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    cur_user : user.uid
                })
            }
        })
    }
    
    delete_Post = () => {
        firebase.firestore().collection('Post').doc(this.state.post_id).delete()
        .then(() => {
            this.props.history.replace('/board')
        })
        .catch((err) => {
            console.log(err);
        })
    }

    go_Update = () => {
        this.props.history.push("/modify_post", this.props.location.state)
    }

    render() {
        return (
            <div>
                <div className = "entire_post">
                    <div className = "title_user_name">
                        <p className = "title_label">제목</p>
                            <div name="title" className = "post_title">{this.state.title}</div>
                        <p className = "title_label">작성자</p>
                            <div name="user_name" className = "post_user_name">{this.state.user_name}</div>
                    </div>
                    <p>내용</p>
                        <div name="content" className = "post_content">{this.state.content}</div>
                    <div className = "detail_button">
                        {this.state.cur_user === this.props.location.state.user_id &&
                            <button onClick = {this.go_Update} className = "link_modify_button">수정하기</button>
                        }
                        {this.state.cur_user === this.props.location.state.user_id &&
                            <button onClick={this.delete_Post} className = "delete_button">삭제하기</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail_Post;