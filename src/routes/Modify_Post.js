import React, { Component } from 'react';
import firebase from '../firebase';
import './css/Detail_Post.css'

class Modify_Post extends Component {
    constructor(props) {
        super(props)    //props에는 Detail_Post으로부터의 데이터 담겨있음
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
        firebase.storage().ref().child(`images/${this.props.location.state.photo}`).getDownloadURL()  //firebase의 storage에서 photo url가져오는거
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

    onListenerFile = (e) => {   //파일 정보 가져오기. file 객체를 가져오기 때문에 별도의 FileReader를 사용한 메서드 정의
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
        var photo_name = '';
        if(photo.name){ //photo를 바꿧는지 안 바꿧는지 구별하기 위해
            photo_name = photo.name
        }else{
            photo_name = photo
        }
        
        if(photo != null){
            firebase.firestore().collection('Post').doc(this.state.post_id).update({    //photo를 업로드 한 경우
                title : title,
                content : content,
                modified_date : new Date(),
                photo : photo_name
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
        }else{
            firebase.firestore().collection('Post').doc(this.state.post_id).update({    //photo를 업로드 하지 않은 경우
                title : title,
                content : content,
                modified_date : new Date()
            })
            .then(() => {
                this.props.history.replace('/board');
            })
            .catch((err) => {
                console.log(err);
            })
        }
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