
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Cart extends Component{
    constructor(props){
      super(props)
      console.log('mountProps:',props)

    }
    componentDidUpdate = () => {
      console.log('cart updated')
    }
    showItems = () => {
      console.log('items=>',this.props.items)

        let rows = [];
        if (this.props.items){
        this.props.items.map((item,index) => {

          let dateFormatted = item.date.substring(0, 10) +
           ' ' + item.time;


            rows.push(
                <div className="row col-xs-12" key={item.treatmentId+'key'}>
                <div className="item col-xs-12">
                <div className="desc col-xs-10">({index+1}) {item.treatmentName} with {item.specialistName} at {dateFormatted}</div>
                <div className="remove col-xs-2">
                <span onClick={() => this.props.removeItem(index)} class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
                </div>
                </div>
                </div>
            )
        });
        }

        return rows
    }

    render() {
       return (
         <div>
            <div className="cart centered col-xs-12">
            <div className="title">Your treatments cart</div>
            <div className="list">
              {this.showItems()}
            </div>
            <Button className="centered selectBtnModal marginTop20" onClick={this.props.clearCart}>Clear</Button>
            </div>
        </div>
      )
    }
}
export default Cart;
