import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom'
import './css/Detail_Post.css'
import Board_comment from '../components/table/Board_comment';

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
            photo : this.props.location.state.photo,
            cur_user : '',
            cur_user_name : '',
            url : '',
            comments : [],
            comment : ''
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    cur_user : user.uid,
                    cur_user_name : user.displayName
                })
            }
        })
        firebase.storage().ref().child(`images/${this.state.photo}`).getDownloadURL()  //photo 가져오는거
        .then((url) => {
            this.setState({
                url : url
            })
            console.log(url)
        })
        .catch((err) => {
            console.log(err)
        })
        var comment_list = []
        firebase.firestore().collection('Comment').orderBy('created_date', 'desc').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                if (doc.data().post_id == this.state.post_id){
                    var comment_info = {}
                    var date = new Date(doc.data().created_date.seconds * 1000);
                    var date_format = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate()
                    comment_info.id = doc.id;
                    comment_info.user_name = doc.data().user_name;
                    comment_info.content = doc.data().content;
                    comment_info.created_date = date_format;
                    comment_list.push(comment_info);
                }
            })
            this.setState({
                comments : comment_list
            })
        })
    }
    
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
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

    createComment = (e) => {
        e.preventDefault();
        const {post_id, comment, cur_user_name} = this.state;
        firebase.firestore().collection('Comment').doc().set({
            post_id : post_id,
            content : comment,
            user_name : cur_user_name,
            created_date : new Date(),
        })
        .then(() => {
            var comment_list = []
            console.log('success');
            firebase.firestore().collection('Comment').orderBy('created_date', 'desc').get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    if (doc.data().post_id == this.state.post_id){
                        var comment_info = {}
                        var date = new Date(doc.data().created_date.seconds * 1000);
                        var date_format = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate()
                        comment_info.id = doc.id;
                        comment_info.user_name = doc.data().user_name;
                        comment_info.content = doc.data().content;
                        comment_info.created_date = date_format;
                        comment_list.push(comment_info);
                    }
                })
                this.setState({
                    comments : comment_list
                })
            })
        })
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
                    <div className = "image_box">
                        {this.state.url &&
                            <img src = {this.state.url}></img>
                        }
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
                <div className = "comment_box">
                    <form onSubmit={this.createComment}>
                        <label>댓글</label>
                        <textarea type="text" name = "comment" onChange = {this.onChange}/>
                        <button type = "submit">등록</button>
                    </form>
                    {this.state.comments.length !== 0  ? <Board_comment data={this.state.comments}/> : ''}
                </div>
            </div>
        );
    }
}

export default Detail_Post;