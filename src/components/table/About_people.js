import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import '../css/Table.css'

class About_people extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }
    }

    render() {
        return (
            <div className = "table_div">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>영화인 이름</TableCell>
                            <TableCell>영화인 분야</TableCell>
                            <TableCell>영화인 필모리스트</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {   
                            this.state.data.map(c => {
                                return(
                                    <TableRow key = {c.peopleCd}>
                                        <TableCell>{c.peopleNm !== null ? c.peopleNm : ''}</TableCell>
                                        <TableCell>{c.repRoleNm !== null ? c.repRoleNm : ''}</TableCell>
                                        <TableCell>{c.filmoNames !== null ? c.filmoNames : ''}</TableCell>
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

export default About_people;