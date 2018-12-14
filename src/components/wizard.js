import React, { Component } from 'react'
import Treatment from './treatment'
import Calendar from './calendar'
import Cart from './cart'

export const DEBUG_MODE = process.env.REACT_APP_DEBUG_MODE;

export default class Wizard extends Component {

  state = {
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

  validate = () => {
    let step = this.steps[this.state.step]

    if (!step.validator) {
      return true
    }

    try {
      step.validator()
      return true
    }
    catch (e) {
      alert(e)
    }
  }
  clearCart = () =>{
    localStorage.removeItem('cart')
    this.setState({cart: null})

  }
  removeItem = (index) =>{
    let cart = this.state.cart;
    cart.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(cart))
    this.setState({cart: cart})

  }
  addToCart = (treatmentId,specialistId,date,time,treatmentName,specialistName,price) =>{
    let cart = localStorage.getItem('cart');

    if (cart){
      cart = JSON.parse(cart)
    }else{
      cart = [];
    }
    let newObj = {
      treatmentId:treatmentId,
      specialistId:specialistId,
      treatmentName: treatmentName,
      specialistName: specialistName,
      price: price,
      fullDate: date.substring(0, 10) +
         'T' + time + ':00-08:00',
      date:date,
      time:time,
    }


    cart.push(newObj)
    localStorage.setItem('cart', JSON.stringify(cart))
    this.setState({cart: cart})
    this.scrollDown()

  }
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

  render() {
    let treatments = React.createElement(Treatment, {
      // Pass shared data between sub-components.
      data: this.state.data,
      // Push sub-component data shared between sub-components.
      push: this.push
    })
    let calendar = React.createElement(Calendar, {
      addToCart: this.addToCart,
      // Pass shared data between sub-components.
      data: this.state.data,
      // Push sub-component data shared between sub-components.
      push: this.push,
      scrollDown: this.scrollDown
    })
    let cart = React.createElement(Cart, {
      items: this.state.cart,
      openCheckout: this.openCheckout,
      addMoreServices: this.addMoreServices,
      setAuthModal: this.props.setAuthModal,
      addToCart: this.addToCart,
      removeItem: this.removeItem,
      clearCart: this.clearCart
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
          {
              (this.state.data.specialist) ? <div className="centered col-xs-12">
                  { calendar }
              </div> : <span></span>
          }
        </div>
        <div className="col-sm-12">
        { cart }
        </div>
      </div>
    )
  }

}
