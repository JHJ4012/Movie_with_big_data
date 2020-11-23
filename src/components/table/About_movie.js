import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import '../css/Table.css'

class About_movie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }
    }

    render() {
        return (
            <div className = "table_div">
                <Table className = "table">
                    <TableHead>
                        <TableRow>
                            <TableCell>영화 제목</TableCell>
                            <TableCell>영화 장르</TableCell>
                            <TableCell>제작 상태</TableCell>
                            <TableCell>개봉 연도</TableCell>
                            <TableCell>제작 국가</TableCell>
                            <TableCell>영화 감독</TableCell>
                            <TableCell>제작 회사</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {   
                                this.state.data.map(c => {
                                    return(
                                        <TableRow key = {c.movieCd}>
                                            <TableCell>{c.movieNm !== null ? c.movieNm : ''}</TableCell>
                                            <TableCell>{c.genreAlt !== null ? c.genreAlt : ''}</TableCell>
                                            <TableCell>{c.prdtStatNm !== null ? c.prdtStatNm : ''}</TableCell>
                                            <TableCell>{c.prdtYear !== null ? c.prdtYear : ''}</TableCell>
                                            <TableCell>{c.repNationNm !== null ? c.repNationNm : ''}</TableCell>
                                            <TableCell>{c.directors.length !== 0 ? c.directors[0].peopleNm : ''}</TableCell>
                                            <TableCell>{c.companys.length !== 0 ? c.companys[0].companyNm : ''}</TableCell>
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

export default About_movie;