import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import * as moment from 'moment'
import NumberFormat from 'react-number-format';

import {  FormGroup, Button, Label, FormControl, Form } from 'react-bootstrap';
import request from 'superagent'
import { API_URL } from '../App'

class Checkout extends Component {
    constructor(props) {
      super(props)
      let user = JSON.parse(localStorage.getItem('loggedUser'))
      let cart = JSON.parse(localStorage.getItem('cart'))
      this.state = {
        customer: user && user.Customer.Customer,
        access_token: user && user.access_token,
        cart: cart,
        payment: {
          cardName:'Sandbox Card',
          cardType:2,
          cardNumber:'4111-1111-1111-1111',
          cardExpiration:'11/2023',
          cardProvider:'Visa',
          CVC:'333',
          postalCode:'33108',
        }
      }
      console.log(this.state)
    }


      processCheckout = () =>{
        let items = [];
        let minDate='2030-00-00T00:00:00-08:00';
        if (this.state.cart){
          this.state.cart.map((item,index) => {
            if (item.fullDate < minDate){
              minDate = item.fullDate
            }
            items.push({
              slot: item.fullDate,
              id: item.treatmentId
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
        let qty = items.length;
        items.forEach(
         function iterator( item ) {
             console.log( "forEach:", item);
             /* each app */
             let form = {
               firstname: this.state.customer.FirstName,
               lastname: this.state.customer.LastName,
               email: this.state.customer.Email,
               phone: this.state.customer.CellPhone,
               customerId: this.state.customer.ID,
               startDateTime: minDate,
               treatments: [item],
               payment: payment,
               access_token: this.state.access_token
             }
             console.log(form);
             request
             .post(API_URL + '/appointment/?access_token='+this.state.access_token)
             .send(form)
             .then(res => {
               console.log('response',res)

               if (res.body.error) {
                 throw new Error(res.body.error)
               }
               if (res.body.ArgumentErrors) {
                 throw new Error(res.body.ArgumentErrors.map(error => error.ErrorMessage))
               }
               if (res.body.IsSuccess===true){
                 this.setState(prev => ({ ...prev, errors: null }))
                 //msg+="Your appointment was created successfully");
               }else if (res.body.ErrorMessage){
                 alert('An error has ocurred: '+res.body.ErrorMessage);
               }


             })

             .catch(errors => {
              console.error(errors)
               alert(errors.message)
               this.setState(prev => ({ ...prev, errors }))
             })
         },
         this
       );

    }


    handleChange(value, key){
        this.setState(prev => ({payment:{...prev.payment,[key]:value}}))
    }

    convertDate = (dob) => {
        dob = dob.replace("/Date(","");
        dob = dob.replace(")/","");

        return moment(dob,'x').format('MM/DD/YYYY');
    }
    render() {

      let form = (
        <div>
        <FormGroup>
            <Label>Name on Card</Label>
            <FormControl
                type="text"
                value={this.state.payment.cardName}
                placeholder={"Name on Card"}
                onChange={e => this.handleChange(e.target.value,'cardType')}
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
            <FormControl
                type="text"
                value={this.state.payment.cardType}
                placeholder={"Credit card type"}
                onChange={e => this.handleChange(e.target.value,'cardType')}
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
                value={this.state.payment.CVC}
                placeholder={"CVC"}
                onChange={e => this.handleChange(e.target.value,'CVC')}
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
        )
    return (
        <div className="col-xs-12 col-sm-6 col-sm-offset-3">
        <div className="title"><h2>Checkout</h2></div>
        <div className="checkout">
            <Form className="whitebackground">
                {form}
                <div className="marginTop20">
                <Button  className="selectBtnModal" onClick={()=>this.processCheckout()}>BOOK</Button>
                </div>
            </Form>
        </div>
        </div>
        );
    }
}
export default Checkout;
