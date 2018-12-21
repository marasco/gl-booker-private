import React, { Component } from 'react'
import Treatment from './treatment'
import Calendar from './calendar'
import Cart from './cart'
import BookResults from './bookResults';

import { connect } from 'react-redux'
import { setSpecialists, addTreatment, removeTreatment, selectDate, selectSpecialist, orderAddItem, orderRemoveItem, orderClearItems } from '../store/actions'

export const DEBUG_MODE = process.env.REACT_APP_DEBUG_MODE;

class Wizard extends Component {

  state = {
    step: 1,
    data: {
      date: null,
      treatment: null,
      specialist: null,
    }
  }

  addMoreServices =() =>{
    this.setState({
      date:null,
      treatment:null,
      specialist:null
    })
    this.scrollUp();
  }
  openCheckout = () => {
    this.setState({showCheckout: true})
  }
  push = (state) => {
    // Let steps components push data to "data" state attribute.
    this.setState(prev => ({ ...prev, data: { ...this.state.data, ...state } }))
  }

  // validate = () => {
  //   let step = this.steps[this.state.step]

  //   if (!step.validator) {
  //     return true
  //   }

  //   try {
  //     step.validator()
  //     return true
  //   }
  //   catch (e) {
  //     alert(e)
  //   }
  // }
  // clearCart = () =>{
  //   localStorage.removeItem('cart')
  //   this.setState({cart: null})

  // }
  // removeItem = (index) =>{
  //   let cart = this.state.cart;
  //   cart.splice(index,1);
  //   localStorage.setItem('cart', JSON.stringify(cart))
  //   this.setState({cart: cart})

  // }
  // addToCart = (treatmentId,specialistId,date,time,treatmentName,specialistName,price) =>{
  //   let cart = localStorage.getItem('cart');

  //   if (cart){
  //     cart = JSON.parse(cart)
  //   }else{
  //     cart = [];
  //   }
  //   let newObj = {
  //     treatmentId:treatmentId,
  //     specialistId:specialistId,
  //     treatmentName: treatmentName,
  //     specialistName: specialistName,
  //     price: price,
  //     fullDate: date.substring(0, 10) +
  //        'T' + time + ':00-08:00',
  //     date:date,
  //     time:time,
  //   }


  //   cart.push(newObj)
  //   localStorage.setItem('cart', JSON.stringify(cart))
  //   this.setState({cart: cart})
  //   this.scrollDown()

  // }
  componentDidMount = () =>{
    let items = localStorage.getItem('cart')
    if (items){
      items = JSON.parse(items)
    }
    this.setState({cart: items})
  }
  scrollUp = () => {
      this.props.scrollUp();
  }
  scrollDown = () => {
      this.props.scrollDown();
  }

  prevStep = () => {
    this.setState(prev => ({ ...prev, step: prev.step - 1 }))
  }

  nextStep = () => {
    this.setState(prev => ({ ...prev, step: prev.step + 1 }))
  }

  goToStep = (n) => {
    this.setState(prev => ({ ...prev, step: n }))
  }

  render() {
    let treatments = React.createElement(Treatment, {
      order: this.props.order,
      data: this.props.data,
      nextStep: this.nextStep,
      goToStep: this.goToStep,
      isActiveStep: this.state.step === 1,
      addTreatment: this.props.addTreatment,
      setSpecialists: this.props.setSpecialists,
      removeTreatment: this.props.removeTreatment,
      selectSpecialist: this.props.selectSpecialist,
      // Pass shared data between sub-components.
      // data: this.state.data,
      // Push sub-component data shared between sub-components.
      push: this.push
    })
    let calendar = React.createElement(Calendar, {
      order: this.props.order,
      nextStep: this.nextStep,
      prevStep: this.prevStep,
      // addToCart: this.addToCart,
      selectDate: this.props.selectDate,
      isActiveStep: this.state.step === 2,
      // Pass shared data between sub-components.
      data: this.state.data,
      // Push sub-component data shared between sub-components.
      push: this.push,
      scrollDown: this.scrollDown
    })
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
      // clearCart: this.clearCart
    })

    return (
      <div>
        {
          (DEBUG_MODE===1
          )?
          <pre>{ JSON.stringify(this.state.data, null, 2) }</pre>:<div></div>
        }
        <div className="centered col-xs-12 marginBottom20">
          <div className="centered col-xs-12">
              <h1 className="centered section-1">BOOK A SERVICE</h1>
          </div>
          <div className="centered col-xs-12 col-md-8 col-md-offset-2">
              <h3>Welcome to Georgia Louise bookings, the leading destination for  the most advanced facials in Manhattan, home to celebrity and world-acclaimed facialist, Georgia Louise, and her elite team. Its time to book your bespoke GLO</h3>
          </div>
        </div>

        <div className="col-sm-12">

          <div className="centered col-xs-12 ">
            { treatments }
          </div>

          {this.state.step >= 2 && (
            <div className="centered col-xs-12">
              { calendar }
            </div>
          )}

          {this.state.step >= 3 && (
            <BookResults
              order={this.props.order}
              orderAddItem={this.props.orderAddItem}
              orderRemoveItem={this.props.orderRemoveItem}
              scrollDown={this.props.scrollDown}
              data={this.props.data}/>
          )}

        </div>
        <div className="col-sm-12">
        { cart }
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
    data: state.data,
    order: state.order,
})

const mapDispatchToProps = dispatch => ({
    orderAddItem: slot => dispatch(orderAddItem(slot)),
    orderRemoveItem: slot => dispatch(orderRemoveItem(slot)),
    orderClearItems: () => dispatch(orderClearItems()),
    setSpecialists: (treatment, specialists) => dispatch(setSpecialists(treatment, specialists)),
    addTreatment: treatment => dispatch(addTreatment(treatment)),
    removeTreatment: treatment => dispatch(removeTreatment(treatment)),
    selectDate: date => dispatch(selectDate(date)),
    selectSpecialist: (treatment, specialist) => dispatch(selectSpecialist(treatment, specialist)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Wizard)
