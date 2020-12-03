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
            photo : this.props.location.state.photo,
            photo_url : ''
        }
    }

    componentDidMount(){
        firebase.storage().ref().child(`images/${this.props.location.state.photo}`).getDownloadURL()  //photo 가져오는거
        .then((url) => {
            this.setState({
                photo_url : url
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    onChange = (e) => {
        e.preventDefault();
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onListenerFile = (e) => {
        e.preventDefault();
        console.log(e.target.files[0])
        this.setState({
            photo : e.target.files[0],
        })
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                photo_url : reader.result
            })
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    update_Post = (e) => {
        e.preventDefault();
        const {title, content, photo } = this.state;
        // console.log(title, content)
        firebase.firestore().collection('Post').doc(this.state.post_id).update({
            title : title,
            content : content,
            modified_date : new Date(),
            photo : photo.name
        })
        .then(() => {
            firebase.storage().ref().child(`images/${this.state.photo.name}`).put(this.state.photo)
            .then((snapshot) => {
                console.log(snapshot);
                this.props.history.replace('/board');
            })
            .catch((err) => {
                console.log(err)
            })
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
                        <p>첨부파일</p>
                        <input type="file" accept="image/*" name="file" onChange = {this.onListenerFile}/>
                        <div className="image_box">
                            {this.state.photo_url && 
                                <img src = {this.state.photo_url}></img>
                            }
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