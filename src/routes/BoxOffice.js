import React, { Component } from 'react';
import Button from '@material-ui/core/Button'

class BoxOffice extends Component {
    state = {
        date: new Date(),
    }
     
    onChange = date => this.setState({ date })
    render() {
        return (
            <div>
                <table>
                    <tr>
                        <td>
                            일별 박스오피스
                        </td>
                    </tr>
                    <tr>
                        <td>
                            1위
                        </td>
                        <td>
                            2위
                        </td>
                        <td>
                            3위
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default BoxOffice;