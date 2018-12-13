
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
            rows.push(
                <div className="item">
                <div className="desc">{item.treatmentId}</div>
                <div className="remove">[x]</div>
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
            <h2>Your treatments cart</h2>
            <div className="list">
              {this.showItems()}
            </div>
            <Button className="centered selectBtnModal" onClick={this.props.clearCart}>Clear</Button>
            </div>
        </div>
      )
    }
}
export default Cart;
