import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import '../css/Board_comment.css'

class Board_comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }
    }

    componentDidUpdate(previousProps, previousState){   //Detail_Board.js에서 댓글 create 했을 떄 바뀌는 props 정보를 받기 위해서
        if (previousProps.data !== this.props.data) {
            this.setState({
                data : this.props.data
            })
        }
    }

    render() {
        return (
            <div className = "comment_table">
                <Table>
                    <TableBody>
                            {   
                                this.state.data.map(c => {
                                    return(
                                        <TableRow className = "comment_item" key = {c.id}>
                                            <TableCell className="content">{c.content !== null ? c.content : ''}</TableCell>
                                            <TableCell className="name">{c.user_name !== null ? c.user_name : ''}</TableCell>
                                            <TableCell className="date">{c.created_date !== null ? c.created_date : ''}</TableCell>
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

export default Board_comment