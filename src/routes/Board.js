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
        firebase.auth().onAuthStateChanged((user) => {
            if(!user){
                if(this.props.history.location.pathname == '/board'){
                    alert("로그인이 필요한 서비스입니다.")
                    this.props.history.replace('/');
                }
            }
        })
        var post_list = [];
        firebase.firestore().collection('Post').orderBy('created_date', 'desc').limit(5).get()
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
                last : snapshot.docs[snapshot.docs.length - 1]
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    test = () => {
        firebase.firestore().collection('Post').orderBy('created_date', 'desc').startAfter(this.state.last.data().created_date).limit(5).get()
        .then((snapshot) => {
            if(snapshot.docs.length != 0){
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
            }else{
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
                    <button className = "pagin_button" onClick={this.test}>View More</button>
                    <div className = "link_create_div">
                        <Link to = "/create_post" className = "link_create">글쓰기</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;