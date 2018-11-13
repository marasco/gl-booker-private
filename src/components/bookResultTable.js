import React from 'react';
import { Table, Input, Label, Col, FormGroup } from 'react-bootstrap';

class BookResultTable extends React.Component {
    showResults = () => {
      return (
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
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