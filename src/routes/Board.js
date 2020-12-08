import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import Board_list from '../components/table/Board_list';
import './css/Board.css'

class Board extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            last : null
        }
    }

    componentDidMount(){
        this._isMounted = true;
        firebase.auth().onAuthStateChanged((user) => {  //로그인 여부 체크
            if(!user){
                if(this.props.history.location.pathname == '/board'){
                    alert("로그인이 필요한 서비스입니다.")
                    this.props.history.replace('/');
                }
            }
        })
        var post_list = [];
        firebase.firestore().collection('Post').orderBy('created_date', 'desc').limit(5).get()  //created_date를 기준으로 5개로 pagination 해서 가져옴
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                var post = {}
                var date = new Date(doc.data().modified_date.seconds * 1000);
                var date_format = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate()
                post.id = doc.id;
                post.user_id = doc.data().user_id;
                post.user_name = doc.data().user_name;
                post.title = doc.data().title;
                post.content = doc.data().content;
                post.photo = doc.data().photo;
                // post.created_date = date_format;
                post.modified_date = date_format;
                post_list.push(post)
            })
            // console.log(snapshot.docs[snapshot.docs.length - 1])
            this.setState({
                data : post_list,
                last : snapshot.docs[snapshot.docs.length - 1]  //pagination 한 정보를 저장
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    viewMore = () => {  // 전의 page 다음 게시물들을 불러옴
        firebase.firestore().collection('Post').orderBy('created_date', 'desc').startAfter(this.state.last.data().created_date).limit(5).get()
        .then((snapshot) => {
            if(snapshot.docs.length != 0){  //다음 게시물이 있을 때
                console.log(snapshot)
                snapshot.forEach((doc) => {
                    var post = {}
                    var date = new Date(doc.data().modified_date.seconds * 1000);
                    var date_format = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate()
                    post.id = doc.id;
                    post.user_id = doc.data().user_id;
                    post.user_name = doc.data().user_name;
                    post.title = doc.data().title;
                    post.content = doc.data().content;
                    post.photo = doc.data().photo;
                    // post.created_date = date_format;
                    post.modified_date = date_format;
                    this.state.data.push(post);
                })
                this.setState({
                    last : snapshot.docs[snapshot.docs.length - 1]
                })
            }else{  //다음 게시물이 없을 때
                alert("더 이상 게시물이 없습니다.")
                this.setState({
                    button_disable : true
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <div className = "board_body">
                    {this.state.data.length !== 0  ? 
                    <Board_list data={this.state.data}/> 
                    : <div className = "notice_no_post">아직 아무도 글을 올리지 않았어요!</div>}
                    <button className = "pagin_button" onClick={this.viewMore}>View More</button>
                    <div className = "link_create_div">
                        <Link to = "/create_post" className = "link_create">글쓰기</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;