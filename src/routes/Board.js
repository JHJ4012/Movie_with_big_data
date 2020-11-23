import React, { Component } from 'react';
import firebase from '../firebase';

class Board extends Component {
    
    constructor() {
        super();
        this.ref = firebase.firestore().collection('user');
        this.unsubscribe = null;
        this.state = {
            id : '',
            pwd : '',
            name : '',
            manager : false
        }
    }

    onClick = () => {
        // const test = [];
        // this.ref.onSnapshot((snapshot) => {
        //     snapshot.docs.map((doc) => {
        //         test.push({
        //             id : doc.data().id,
        //             pwd : doc.data().pwd,
        //             name : doc.data().name,
        //             manager : doc.data().manager
        //         })
        //     })
        // });
        // console.log(test);
        this.ref.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().name}`);
            })
        })
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { id, pwd, name, manager } = this.state;
        this.ref.add({
          id,
          pwd,
          name,
          manager
        }).then((docRef) => {
          this.setState({
            id: '',
            pwd: '',
            name: ''
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                        <label>ID</label>
                        <input type="text" name="id" onChange={this.onChange} placeholder="Title" />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <textArea name="pwd" onChange={this.onChange} placeholder="Description" cols="80" rows="3"></textArea>
                    </div>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" name="name" onChange={this.onChange} placeholder="Author" />
                    </div>
                    <button type="submit" class="btn btn-success">Submit</button>
                </form>
            </div>
        );
    }
}

export default Board;