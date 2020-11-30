import React, { Component } from 'react';

class Detail_Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_name : this.props.location.state.user_name,
            title : this.props.location.state.title,
            content : this.props.location.state.content
        }
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }


    render() {
        return (
            <div>
                <div>
                    <textarea name="user_name" onChange={this.onChange}>{this.state.user_name}</textarea>
                    <textarea name="title" onChange={this.onChange}>{this.state.title}</textarea>
                    <textarea name="content" onChange={this.onChange}>{this.state.content}</textarea>
                </div>
            </div>
        );
    }
}

export default Detail_Post;