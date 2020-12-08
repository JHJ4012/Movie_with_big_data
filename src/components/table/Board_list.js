import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import '../css/About_Board.css'

class Board_list extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }
    }

    componentDidUpdate(previousProps, previousState){   //Board.js에서 댓글 create 했을 떄 바뀌는 props 정보를 받기 위해서
        if (previousProps.data !== this.props.data) {
            this.setState({
                data : this.props.data
            })
        }
    }

    detail_Post = (c) => {  //각 게시물을 눌렀을 때 해당 게시물에 대해 Detail_Board.js에 데이터 전송 후 렌더링 
        this.props.history.push('/detail_post', c);
    }

    render() {
        return (
            <div className = "board_table">
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
                                        <TableRow className = "board_item" key = {c.id} onClick={() => this.detail_Post(c)}>
                                            <TableCell>{c.title !== null ? c.title : ''}</TableCell>
                                            <TableCell>{c.user_name !== null ? c.user_name : ''}</TableCell>
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

export default withRouter(Board_list)