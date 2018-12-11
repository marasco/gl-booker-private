import React from 'react';
import {Table, Button} from 'react-bootstrap';
import moment from 'moment';

class BookResultTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            times: props.times
        }
    }

    showResults = () => {
        let rows = [];
        this.state.times.map((time,index) => {
            rows.push(
                <tr key={"time-"+index}>
                    <td>
                        {(time.start)?time.start:""}
                    </td>
                    <td>
                        {(time.end)?time.end:""}
                    </td>
                    <td>
                        {(time.with)?time.with:""}
                    </td>
                    <td><Button bsStyle="primary"> BOOK </Button></td>
                </tr>
            )
        });

        return (
            <tbody>
                {rows}
            </tbody>)
    }

    render() {
        return (
            <div className="col-xs-10 col-sm-8 col-md-8 col-sm-offset-2 col-md-offset-2">
                <Table>
                    <thead>
                    <tr>
                        <th>START</th>
                        <th>END</th>
                        <th>WITH</th>
                        <th>SELECT</th>
                    </tr>
                    </thead>
                    {this.showResults()}
                </Table>
            </div>
        );
    }
}

export default BookResultTable;