import React, { Component } from 'react';
import * as moment from 'moment'
import {  FormGroup, Button, Label, FormControl, Form } from 'react-bootstrap';
import request from 'superagent'
import { API_URL, API_USER, API_PASS } from '../App'
import Select from 'react-select';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { timerStartTimer } from '../store/timer'
import { orderAddReservation, dataSaveOrder,removeTreatments,orderClearItems,orderClearReservation,orderCancelReservation } from '../store/actions'
import Cart from './cart'
import Timer from './timer'

const customStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white', height: '40', border:'solid 1px #333',borderRadius:0 }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      height: '40',
      backgroundColor: isDisabled
        ? null
        : isSelected ? 'black' : isFocused ? '#e1e1e1' : 'white',
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? 'white'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}
class Checkout extends Component {
    constructor(props) {
      super(props)
      let user = JSON.parse(localStorage.getItem('loggedUser'))
      let cart = JSON.parse(localStorage.getItem('cart'))

      let sum = 0;
      this.props.order.slots.map((item,index) => {
        if (item && item.price){
        sum+=item.price
        item.id = index
      }
      })
      console.log('cart1:',cart);


      this.state = {
        sum: sum,
        message: '',
        timerStarted: false,
        customer: user && user.Customer.Customer,
        access_token: user && user.access_token,
        cart: cart,
        showPromoCode: false,
        payment: {
          cardName:'Sandbox Card',
          cardType:{value:2,label:'Visa'},
          cardNumber:'4111-1111-1111-1111',
          cardExpiration:'11/2023',
          cardProvider:'Visa',
          cardSecurityCode: '333',
          postalCode:'33108',
        }
      }
      this.showPromoCode = this.showPromoCode.bind(this);

      console.log(this.state)
    }
    showPromoCode() {
      let showPromoCode = !this.state.showPromoCode;
      this.setState({
        showPromoCode
      })
    }
    componentDidMount = () => {
      console.log('reservation',this.props.order.reservation);
      this.createIncompleteAppointments()
      // to do: add promise for timerStart
      this.props.timerStartTimer()
    }
    logout() {
        localStorage.removeItem('loggedUser')
        this.setState(prev => ({ ...prev, customer: null }))
        return this.props.history.push('/');
    }
    createIncompleteAppointments = () => {
      let slots = this.props.order.slots
      if (!slots){return false}
      slots.map((slot,index)=>{
        if (slot) {
          console.log('checking if this slot has reservation')
          let existReservation=false;
           if (this.props.order.reservation){
           this.props.order.reservation.map(res=>{
            if (res.slotIndex===index){
              existReservation=true;
            }
           })
           }
           if (!existReservation){
             console.log('creating reservation for slot '+index)
                request
                  .post(API_URL + '/appointment/reservation')
                  .auth(API_USER, API_PASS)
                  .send({
                    startDateTime: slot.startDate,
                    access_token: this.state.access_token,
                    treatments: slot.slot.availabilityItems.map(item => ({
                      id: item.serviceId,
                      slot: item.startDateTime,
                      employeeId: item.employeeId,
                    }))
                  })
                  .then(res => {
                  if (res.body.ErrorMessage && res.body.ErrorMessage ==='invalid access token'){
                    alert("Your session has expired, you have to login again.")
                    this.logout();
                    return false;
                  }


                    if (res.body.IncompleteAppointmentID) {
                      this.props.orderAddReservation({
                        id: res.body.IncompleteAppointmentID,
                        slotIndex: index
                      })

                      if (this.state.timerStarted===false){
                        console.log('start Timer');
                        this.setState({
                          timerStarted: true
                        })

                        this.props.timerStartTimer()
                      }
                    } else {
                      throw new Error("We're sorry, but the appointment time you requested is no longer available");
                    }
                  })
                  .catch(error => {
                    console.log(error)
                    alert(error.message)
                    this.props.history.push('/')
                  })
            } // end if
        }
      })


    }

    removeCartItem = (id) => {
      console.log('removing id '+id)
      let cart = this.state.cart;
      let toRemove = -1;
      cart.map((item,index) => {

        if (item.id === id){
          toRemove = index;
        }
      })
      if (toRemove>-1){
      cart.splice(toRemove,1);
      localStorage.setItem('cart', JSON.stringify(cart))
      this.setState({cart: cart})
      }
      if (cart.length===0){
        this.props.history.push('/appointments');
      }
      return true;
    }
      processCheckout = () =>{
        console.log(this.props.order)
        let items = [];
        let minDate='2030-00-00T00:00:00-08:00';
        this.setState({message: 'Processing your payment'})

        if (this.state.cart){
          console.log('cart2:',this.state.cart);

          this.state.cart.map((item,index) => {
            if (item.fullDate < minDate){
              minDate = item.fullDate
            }
            items.push({
              slot: item.fullDate,
              id: item.treatmentId,
              index:item.id
            })
          })
        }
        let payment = this.state.payment;
        let cardExp = payment.cardExpiration;
        let parts = cardExp.split('/');
        if (parts.length>1){
          cardExp = parts[1]+'-'+parts[0]
          payment.cardExpiration=cardExp;
        }
        payment.cardType=payment.cardType.value;
        //let qty = items.length;

        if (!this.props.order.slots){
          alert('No slots available'); return false;
        }
        this.props.order.slots.map((slot,index)=>{
          if (slot){
            console.log('slot',slot)
            console.log('res',this.props.order.reservation)
            let hasReservation=false;
            let incompleteAppointmentId = null;
            if (this.props.order.reservation){
              this.props.order.reservation.map(res=>{
                if (res.slotIndex === index){
                   incompleteAppointmentId = res.id;
                }
              })
            }
            if (incompleteAppointmentId){

              let payload = {
                firstname: this.state.customer.FirstName,
                lastname: this.state.customer.LastName,
                email: this.state.customer.Email,
                phone: this.state.customer.CellPhone,
                customerId: this.state.customer.ID,
                incompleteAppointmentId,
                startDateTime: slot.startDate,
                treatments: slot.slot.availabilityItems.map(item => ({
                  id: item.serviceId,
                  slot: item.startDateTime,
                  employeeId: item.employeeId,
                })),
                payment,
                cuponCode: this.state.cuponCode,
                access_token: this.state.access_token
              }
              // work with promises
              console.log('createApp:',payload)
              this.createAppointment(payload)

            }
          }

        })



    }
    addMoreTreatments = () => {
      let index = localStorage.getItem('useIndex');
      index = parseInt(index)+1;
      localStorage.setItem('useIndex',index)
      console.log('new index:'+index)
      this.props.removeTreatments()
      this.props.history.push('/')
    }
    createAppointment = payload => {
        request
          .post(API_URL + '/appointment')
          .auth(API_USER, API_PASS)
          .send(payload)
          .then(res => {
            console.log('response',res)

            if (res.body.error) {
              throw new Error(res.body.error)
            }
            if (res.body.ArgumentErrors) {
              throw new Error(res.body.ArgumentErrors.map(error => error.ErrorMessage))
            }
            if (res.body.IsSuccess===true){
              this.props.dataSaveOrder(this.props.order)
              this.setState({message: 'Your appointment was made successfully.'})
              this.setState(prev => ({ ...prev, errors: null }))
              this.props.orderClearReservation()

              this.props.orderClearItems()
              this.props.removeTreatments()
              return this.props.history.push('/appointments')

              //msg+="Your appointment was created successfully");
            }else if (res.body.ErrorMessage && res.body.ErrorMessage ==='invalid access token'){
              alert("Your session has expired, you have to login again.")
              this.setState({message: 'Your appointment failed: your session expired'})
            }else if (res.body.ErrorMessage){
              this.setState({message: 'Your appointment failed: '+res.body.ErrorMessage})
            }
        })
        .catch(errors => {
          console.error(errors)
          this.setState({message: 'Your appointment failed: '+errors.message})
          this.setState(prev => ({ ...prev, errors }))
        })
    }

    cancelCheckout = () => {
      if (this.props.order.reservation && this.props.order.reservation.length) {
        this.props.order.reservation.map(item => {
          this.cancelIncompleteAppointment(item.id)

        })
        // need promises (cancel all appointments)
          this.props.orderClearReservation()
          this.props.orderClearItems()
          this.props.removeTreatments()
          return this.props.history.push('/')
      }
    }

    cancelIncompleteAppointment = (id) => {
      request
        .delete(API_URL + '/appointment/reservation')
        .auth(API_USER, API_PASS)
        .send({
          access_token: this.state.access_token,
          incompleteAppointmentId: id
        })
        .then(res => {
          if (res.body.IsSuccess) {
          }else{
            throw new Error('Could not cancel reservation');
          }
        })
        .catch(error => alert(error.message))
    }

    handleChange(value, key){
        this.setState(prev => ({payment:{...prev.payment,[key]:value}}))
    }

    handleCuponChange(value) {

      this.setState(prev => ({ cuponCode: value }));
    }

    convertDate = (dob) => {
        dob = dob.replace("/Date(","");
        dob = dob.replace(")/","");

        return moment(dob,'x').format('MM/DD/YYYY');
    }
    onTypeChange = type => {
      let payment = this.state.payment
      payment.cardType = type
      this.setState({ payment: payment })
    }
    getCardTypeOptions = () => {
      let options = []
      options.push({
        value: 2,
        label: "Visa"
      });
      options.push({
        value: 1,
        label: "American Express"
      });
      options.push({
        value: 3,
        label: "MasterCard"
      });

      return options
    }
    showItems = () => {

        let rows = [];
        //let sum = 0;
        if (this.state.cart){
        this.state.cart.map((item,index) => {
          //sum += item.price
          let dateFormatted = item.date.substring(0, 10) +
           ' ' + item.time;


            rows.push(
                <div className="col-xs-12 cartsummary"  key={item.treatmentId+'key'+index}>
                <div className="desc col-xs-12">({index+1}) <strong>{item.treatmentName}</strong> with <i>{item.specialistName}</i> at {dateFormatted} - <strong>USD {item.price}</strong></div>
                </div>
            )
            return item
        });
        }

        return rows
    }

    render() {

      if (!this.props.order.slots.length) {
        return <Redirect to="/" />
      }



          let cart = React.createElement(Cart, {
            order: this.props.order,
            items: this.state.cart,
            openCheckout: this.openCheckout,
            addMoreServices: this.addMoreServices,
            setAuthModal: this.props.setAuthModal,
            // addToCart: this.addToCart,
            // removeItem: this.removeItem,
            orderRemoveItem: this.props.orderRemoveItem,
            orderClearItems: this.props.orderClearItems,
            readonly: true
            // clearCart: this.clearCart
          })
      let form = (
        <div>

          <Timer/>

          <div>
          <FormGroup>
              <Label>Name on Card</Label>
              <FormControl
                  type="text"
                  value={this.state.payment.cardName}
                  placeholder={"Name on Card"}
                  onChange={e => this.handleChange(e.target.value,'cardName')}
              />
          </FormGroup>

          <FormGroup>
              <Label>Credit card number</Label>
              <FormControl
                  type="text"
                  value={this.state.payment.cardNumber}
                  placeholder={"Credit card number"}
                  onChange={e => this.handleChange(e.target.value,'cardNumber')}
              />
          </FormGroup>

          <FormGroup>
              <Label>Credit card type</Label>
              <Select
                placeholder={"Credit card type"}
                styles={customStyles}
                value={this.state.payment.cardType}
                onChange={this.onTypeChange}
                options={ (this.getCardTypeOptions()) }
             />

          </FormGroup>
          <Form componentClass="fieldset" inline>

          <FormGroup>
              <Label>Expiration</Label>
              <FormControl
                  type="text"
                  value={this.state.payment.cardExpiration}
                  placeholder={"MM/YYYY"}
                  onChange={e => this.handleChange(e.target.value,'cardExpiration')}
              />
          </FormGroup>{' '}

          <FormGroup>
              <Label>CVC</Label>
              <FormControl
                  type="text"
                  value={this.state.payment.cardSecurityCode}
                  placeholder={"CVC"}
                  onChange={e => this.handleChange(e.target.value,'cardSecurityCode')}
              />
          </FormGroup>{' '}
          <FormGroup>
              <Label>Postal Code</Label>
              <FormControl
                  type="text"
                  value={this.state.payment.postalCode}
                  placeholder={"Postal Code"}
                  onChange={e => this.handleChange(e.target.value,'postalCode')}
              />
          </FormGroup>
          </Form>

          </div>
        </div>
        )

    let promoCodeForm = (
      <FormGroup>
        <Label>Apply Promo Code</Label>
        <FormControl
          type="text"
          value={this.state.cuponCode}
          placeholder={"Promo Code"}
          onChange={e => this.handleCuponChange(e.target.value)}
        />
      </FormGroup>
    );
    return (
        <div className="col-xs-12 col-sm-12 col-lg-10 col-lg-offset-1">
            <div className="title"><h2>Checkout</h2></div>
            <div className="col-sm-8">
              <div className="checkout">
                <Form className="whitebackground">
                    {form}
                    <div className="marginTop20">
                    <div>
                      {
                        (this.state.message.length)?
                        <p>{this.state.message}</p>:<p></p>
                      }
                    </div>
                    <Button  className="selectBtnModal" style={{marginRight:'10px'}} onClick={()=>this.processCheckout()}>BOOK</Button>
                    <Button  className="selectBtnModal" style={{marginRight:'10px'}} onClick={()=>this.cancelCheckout()}>CANCEL</Button>
                    <Button  className="selectBtnModal" onClick={()=>this.addMoreTreatments()}>ADD MORE TREATMENTS</Button>
                    </div>
                </Form>
            </div>
          </div>
          <div className="col-sm-4">

            <div className="cartsummary-container row">
              <div className="col-xs-12">
                <div className="title">
                You are booking
                </div>
              </div>

              <div className="col-xs-12">
                 <div className="col-xs-10">
                   {!this.state.showPromoCode && <a onClick={this.showPromoCode}>Apply a promo code</a>}
                   {this.state.showPromoCode && promoCodeForm}
                 </div>
               </div>

              <div className="col-xs-12">
                {cart}
              </div>
            </div>


          </div>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    order: state.order,
    timer: state.timer,
})

const mapDispatchToProps = dispatch => ({
  timerStartTimer: () => dispatch(timerStartTimer()),
  orderClearItems: () => dispatch(orderClearItems()),
  orderClearReservation: order => dispatch(orderClearReservation()),
  orderCancelReservation: order => dispatch(orderCancelReservation()),
  dataSaveOrder: order => dispatch(dataSaveOrder(order)),
  removeTreatments: () => dispatch(removeTreatments()),
  orderAddReservation: reservation => dispatch(orderAddReservation(reservation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))
