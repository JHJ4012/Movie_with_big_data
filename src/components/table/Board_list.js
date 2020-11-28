import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import '../css/Table.css'
import firebase from '../../firebase';

class Board_list extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            post_user_name : ''
        }
    }

    componentDidMount(){
        var user = firebase.auth().currentUser;
        this.setState({
            post_user_name : user.displayName
        })
    }

    render() {
        return (
            <div className = "table_div">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>제목</TableCell>
                            <TableCell>작성자</TableCell>
                            <TableCell>날짜</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {   
                                this.state.data.map(c => {
                                    return(
                                        <TableRow key = {c.id}>
                                            <TableCell>{c.title !== null ? c.title : ''}</TableCell>
                                            <TableCell>{this.state.post_user_name !== null ? this.state.post_user_name : ''}</TableCell>
                                            <TableCell>{c.modified_date !== null ? c.modified_date : ''}</TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default Board_list;