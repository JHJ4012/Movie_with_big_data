import React, { Component } from 'react';
import firebase from '../firebase';
import './css/Detail_Post.css'

class Modify_Post extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            post_id : this.props.location.state.id,
            user_name : this.props.location.state.user_name,
            title : this.props.location.state.title,
            content : this.props.location.state.content,
        }
    }

    onChange = (e) => {
        e.preventDefault();
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    update_Post = (e) => {
        e.preventDefault();
        const {title, content } = this.state;
        console.log(title, content)
        firebase.firestore().collection('Post').doc(this.state.post_id).update({
            title : title,
            content : content,
            modified_date : new Date(),
        })
        .then(() => {
            this.props.history.replace('/board');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <div className = "entire_post">
                    <form onSubmit={this.update_Post}>
                        <div className = "title_user_name">
                            <p className = "title_label">제목</p>
                                <textarea name="title" onChange={this.onChange} value={this.state.title} className = "post_title"></textarea>
                            <p className = "title_label">작성자</p>
                                <textarea name="user_name" value={this.state.user_name} className = "post_user_name"></textarea>
                        </div>
                        <p>내용</p>
                        <textarea name="content" onChange={this.onChange} value={this.state.content} className = "post_content"></textarea>
                        <div className="detail_button">
                            <button type="submit" onClick={this.update_Post} className = "modify_button">수정하기</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Modify_Post;