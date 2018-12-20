import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {withRouter} from 'react-router-dom'

class Cart extends Component{
    showItems = () => {

        let rows = [];
        this.props.order.slots.map((item,index) => {

          let dateFormatted = item.startDate.substring(0, 10) +
           ' ' + item.slot.time;



            rows.push(
                <div className="row"  key={item.treatmentId+'key'+index}>
                <div className="col-xs-12">
                <div className="item col-xs-12">
                <div className="desc col-xs-10">({index+1}) <strong>{item.treatmentName}</strong> with <i>{item.specialistName}</i> at {dateFormatted} - <strong>USD {item.price}</strong></div>
                <div className="remove col-xs-2">
                <span onClick={() => this.props.orderRemoveItem(item)} className="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
                </div>
                </div>
                </div>
                </div>
            )
            return item
        });

        return rows
    }

    checkout = () => {
        let loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
        if( !loggedUser ) {
            this.props.setAuthModal(true);
            localStorage.setItem('pendingCheckout',1);
        }else{
            this.props.history.push('/checkout')
        }
    }

    render() {
       return (
         <div>
            <div className="cart centered">
            <div className="title">Your treatments cart</div>
            <div className="list">
              {this.showItems()}
            </div>

            {
              (this.props.order.slots.length>0)?
                  <div className="centered row marginBottom20">
                  <div className="col-xs-12">
                  <Button className="centered selectBtnModal marginTop20" onClick={this.props.orderClearItems}>Clear Items</Button>
                  </div>
                      <div className="col-xs-12">
                          <Button className="selectBtnModal" onClick={()=>{
                              this.props.addMoreServices()
                          }} >ADD MORE SERVICES</Button>
                          <Button className="selectBtnModal" onClick={()=>{
                              this.checkout()
                          }} >PROCEED TO CHECKOUT</Button>
                      </div>
                  </div>
                  :<div><p className="marginTop20">Your treatments list is empty.</p></div>


            }
            </div>
        </div>
      )
    }
}
export default withRouter(Cart);
