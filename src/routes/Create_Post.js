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
            photo : null,
            photo_url : '',
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {  //현재 로그인 된 사용자 정보
            if(user){
               this.setState({
                   user_id : user.uid,
                   user_name : user.displayName,
               })
            }
        })
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

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => { //게시물 생성
        e.preventDefault();
        const { title, content, user_id, user_name, photo} = this.state;
        if(photo != null){      //photo를 업로드 한 경우
            firebase.firestore().collection('Post').doc().set({ 
                user_id: user_id,
                user_name : user_name,
                title : title,
                content : content,
                created_date : new Date(),
                modified_date : new Date(),
                photo : photo.name
            })
            .then(() => {
                firebase.storage().ref().child(`images/${this.state.photo.name}`).put(this.state.photo)
                .then((snapshot) => {
                    console.log(snapshot);
                    this.props.history.goBack();
                })
                .catch((err) => {
                    console.log(err)
                })
            })
        }else{  //photo를 업로드 안 한 경우
            firebase.firestore().collection('Post').doc().set({
                user_id: user_id,
                user_name : user_name,
                title : title,
                content : content,
                created_date : new Date(),
                modified_date : new Date(),
            })
            .then(() => {
                this.props.history.goBack();
            })
        }
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
                        <p>첨부파일</p>
                        <input type="file" accept="image/*" name="file" onChange = {this.onListenerFile}/>
                        <div className = "image_box">
                            {this.state.photo_url && 
                            <img src = {this.state.photo_url}></img>
                            }
                        </div>
                    </div>
                    <div>
                        <p>내용</p>
                        <textarea name="content" onChange={this.onChange} className = "post_content" />
                    </div>
                    <button type="submit">업로드</button>
                </form>
            </div>
        );
    }
}

export default Create_Post;