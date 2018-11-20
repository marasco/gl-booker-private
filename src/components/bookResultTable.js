import React from 'react';
import { Table } from 'react-bootstrap';

class BookResultTable extends React.Component {
    showResults = () => {
      return (
        <tr>
          <td>10:00 AM</td>
          <td>11:30 AM</td>
          <td>Taylor</td>
          <td>BOOK</td>
        </tr>)
    }
    render() { 
            return (
             <div className="datatable">
                 <Table responsive>
                        <thead>
                            <tr>
                                <th>START</th>
                                <th>END</th>
                                <th>WITH</th>
                                <th>SELECT</th>
                            </tr>
                        </thead>
                    <tbody>
                        { this.showResults() }
                    </tbody>
                </Table>
             </div>
         );
  }
}
export default BookResultTable;