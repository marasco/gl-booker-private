
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Cart extends Component{
    showItems = () => {

        let rows = [];
        if (this.props.items){
        this.props.items.map((item,index) => {

          let dateFormatted = item.date.substring(0, 10) +
           ' ' + item.time;


            rows.push(
                <div className="row"  key={item.treatmentId+'key'+index}>
                <div className="col-xs-12">
                <div className="item col-xs-12">
                <div className="desc col-xs-10">({index+1}) {item.treatmentName} with {item.specialistName} at {dateFormatted}</div>
                <div className="remove col-xs-2">
                <span onClick={() => this.props.removeItem(index)} className="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
                </div>
                </div>
                </div>
                </div>
            )
            return item
        });
        }

        return rows
    }

    render() {
      let loggedUser = JSON.parse(localStorage.getItem('loggedUser'))

       return (
         <div>
            <div className="cart centered">
            <div className="title">Your treatments cart</div>
            <div className="list">
              {this.showItems()}
            </div>

            {
              (this.props.items && this.props.items.length>0)?
                  <div className="centered row marginBottom20">
                  <div className="col-xs-12">
                  <Button className="centered selectBtnModal marginTop20" onClick={this.props.clearCart}>Clear Items</Button>
                  </div>
                  {
                    (!loggedUser)?
                    <div className="col-xs-12">
                      <Button className="selectBtnModal" onClick={()=>{
                        this.props.addMoreServices()
                      }} >ADD MORE SERVICES</Button>
                      <Button className="selectBtnModal" onClick={()=>{
                          this.props.setAuthModal(true)
                        }} >PROCEED TO CHECKOUT</Button>
                    </div>
                    :
                    <div  className="col-xs-12">
                      <Button className="selectBtnModal" onClick={()=>{
                          this.props.openCheckout()
                        }} >PROCEED TO CHECKOUT</Button>
                    </div>
                  }

                  </div>
                  :<div><p className="marginTop20">Your treatments list is empty.</p></div>


            }
            </div>
        </div>
      )
    }
}
export default Cart;
