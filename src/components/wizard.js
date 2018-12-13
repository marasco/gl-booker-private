import React, { Component } from 'react'
import Treatment from './treatment'
import Calendar from './calendar'
import Cart from './cart'
export const DEBUG_MODE = process.env.REACT_APP_DEBUG_MODE;

export default class Wizard extends Component {
  constructor(props){
      super(props)
  }

  state = {
    data: {
      date: null,
      treatment: null,
      specialist: null,
    }
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
    console.log('cart is clear now')
    this.setState({cart: null})

  }
  addToCart = (treatmentId,specialistId,date,time) =>{
    let cart = localStorage.getItem('cart');

    if (cart){
      cart = JSON.parse(cart)
    }else{
      cart = [];
    }
    console.log('old_cart: ',cart)
    let newObj = {
      'treatmentId':treatmentId,
      'specialistId':specialistId,
      'date':date,
      'time':time,
    }
    console.log('add=>',newObj);
    cart.push(newObj)
    console.log('new_cart: ',cart)
    localStorage.setItem('cart', JSON.stringify(cart))

    this.setState({cart: cart})

  }
  componentDidMount = () =>{
    let items = localStorage.getItem('cart')
    if (items){
      items = JSON.parse(items)
    }
    this.setState({cart: items})
    console.log('cart=>',items)
  }
  scrollDown = () => {
      window.scroll({
          behavior: 'smooth',
          left: 0,
          top: document.documentElement.scrollHeight
      });
  }

  render() {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
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
      addToCart: this.addToCart,
      clearCart: this.clearCart
    })

    return (
      <div>
        {
          (DEBUG_MODE===1
          )?
          <pre>{ JSON.stringify(this.state.data, null, 2) }</pre>:<div></div>
        }
        <div className="centered col-xs-12">
          { treatments }
        </div>
        {
            (this.state.data.specialist) ? <div className="centered col-xs-12">
                { calendar }
            </div> : <span></span>
        } 
        { cart }
 
        {
          (!loggedUser && this.state.data.date && this.state.data.specialist)?
              <div className="centered col-xs-12 marginBottom20">
                <a href="#" onClick={()=>{
                  this.props.setAuthModal(true)
                }} >Sign In</a>
              </div>
              :
              null
        } 
      </div>
    )
  }

}
