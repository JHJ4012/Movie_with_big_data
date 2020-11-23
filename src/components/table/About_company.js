import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import '../css/Table.css'

class About_company extends Component {
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
                            <TableCell>영화사 이름</TableCell>
                            <TableCell>영화사 분류</TableCell>
                            <TableCell>대표자명</TableCell>
                            <TableCell>필모리스트</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {   
                                this.state.data.map(c => {
                                    return(
                                        <TableRow key = {c.companyCd}>
                                            <TableCell>{c.companyNm !== null ? c.companyNm : ''}</TableCell>
                                            <TableCell>{c.companyPartNames !== null ? c.companyPartNames : ''}</TableCell>
                                            <TableCell>{c.ceoNm !== null ? c.ceoNm : ''}</TableCell>
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

export default About_company;