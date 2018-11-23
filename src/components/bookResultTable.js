import React from 'react';
import { Table } from 'react-bootstrap';

class BookResultTable extends React.Component {
    showResults = () => {
      return (
        <tbody>
            <tr>
                <td>10:00 AM</td>
                <td>11:30 AM</td>
                <td>Taylor</td>
                <td><button className="btn-default"> BOOK </button></td>
            </tr>
            <tr>
                <td>11:00 AM</td>
                <td>12:30 AM</td>
                <td>Thornton</td>
                <td><button className="btn-default"> BOOK </button></td>
            </tr>
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
                        { this.showResults() }
                </Table>
             </div>
         );
  }
}
export default BookResultTable;