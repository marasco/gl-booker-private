import React from 'react';
import {Table, Button} from 'react-bootstrap';

class BookResultTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            times: props.times
        }
        //this.book = this.props.book.bind(this);

    }

    addItem = time => {
        if (this.props.order.reservation) {
            let answer = window.confirm('Your previous reservation will be cancelled, do you want to continue?')

            if (!answer) {
                return
            }
            this.props.orderCancelReservation()
        }
        this.props.scrollDown()
        this.props.orderAddItem(time)
    }

    isSelected = slot => {
        return this.props.order.slots.indexOf(slot) >= 0
    }

    showResults = () => {
        let rows = [];

        this.state.times.map((time,index) => {
          let timeSlot = time
          timeSlot.treatments = this.props.order.treatments
          console.log('timeSlot: ',timeSlot)
            rows.push(
                <tr key={"time-"+index}>
                    <td>
                        {(time.start)?time.start:""}
                    </td>
                    <td>
                        {(time.end)?time.end:""}
                    </td>
                    <td>{
                        this.isSelected(time)
                        ? <Button className="selectBtnModal" onClick={() => this.props.orderRemoveItem(time)}> CANCEL </Button>
                        : <Button className="selectBtnModal" onClick={() => this.props.orderAddItem(timeSlot)}> BOOK </Button> 
                    }</td>
                </tr>
            )
            return time
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
                        <th width="200">SELECT</th>
                    </tr>
                    </thead>
                    {this.showResults()}
                </Table>
            </div>
        );
    }
}

export default BookResultTable;
