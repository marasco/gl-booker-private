import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import * as moment from 'moment'
import {withRouter} from 'react-router-dom'
import {TIME_FORMAT} from '../App'

class Cart extends Component{
  constructor(props){
    super(props)
    this.state = {
      readonly: props.readonly && props.readonly===true
    }
    console.log('readonly',this.state.readonly)
  }
  renderList = (treats, avail)=> {
    let itemResult=[]
    let dateFormatted = avail.startDateTime.substring(0, 10) +
     ' ' + moment(avail.startDateTime.substring(11, 16),"HH:mm").format(TIME_FORMAT);
     if (typeof treats==='object'){
       let i=1

       Object.keys(treats).forEach(function(index) {
          let service= treats[index]
          let treatmentName=''
          let treatmentPrice=0
          if (service.treatment.ID === avail.serviceId){
            treatmentName = service.treatment.Name;
            treatmentPrice = service.treatment.Price.Amount;
            itemResult.push(<span>
            ({i}) <strong>{treatmentName}</strong> at {dateFormatted} - <strong>USD {treatmentPrice}.00</strong>
            </span>)
          }


          return service

        });
      }
      return (

          <div className="cartObject">
            {itemResult}
          </div>

      )
  }
  componentDidMount = () => {
    let sum=0
    this.props.order.slots.map((item,index) => {
      if (item){
      let treats = item.treatments
      Object.keys(treats).forEach(function(index) {
         let service= treats[index]
         let treatmentPrice = service.treatment.Price.Amount;
         sum+=treatmentPrice
       })
     }
   })

   this.setState({sum:sum})
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
            {
              (this.state.readonly)?<div></div>:<div className="title">Your treatments cart</div>
            }

            <div className="list">
             {(()=>{
                let rows = [];
                //const treats = this.props.order.slots
                this.props.order.slots.map((item,index) => {
                  if (item){
                  let treats = item.treatments
                  let items =item.slot.availabilityItems.map(this.renderList.bind(this, treats));

                  rows.push(
                    <div className="row"  key={'cartItem'+index}>
                    <div className="col-xs-12">

                      {
                        (this.state.readonly!==true)?
                        <div className="item col-xs-12">
                        <div className=" col-xs-10">
                          {items}
                        </div>
                        <div className="remove col-xs-2">
                        <span onClick={() => this.props.orderRemoveItem(item)} className="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
                        </div>
                        </div>
                        :
                        <div className="item col-xs-12">
                        <div className=" col-xs-12">
                          {items}
                        </div>
                        </div>
                      }

                    </div>
                    </div>
                  )

                  return item
                  }
                })
                return rows
              })()}
            </div>

            {
              (this.props.order.slots.filter(function(e){return e!==null}).length>0)?
                  <div className="centered row marginBottom20">
                  {
                    (this.state.readonly===true)?<div className="total">Total: USD {this.state.sum}</div>:
                    <div>
                      <div className="col-xs-12">
                      <Button className="centered selectBtnModal marginTop20" onClick={this.props.orderClearItems}>Clear Items</Button>
                      </div>

                      <div className="col-xs-12">
                          <Button className="selectBtnModal" onClick={()=>{
                              this.checkout()
                          }} >PROCEED TO CHECKOUT</Button>
                      </div>


                      </div>
                    }
                  </div>
                  :<div><p className="marginTop20">Your treatments cart is empty.</p></div>

            }
            </div>
        </div>
      )
    }
}
export default withRouter(Cart);
