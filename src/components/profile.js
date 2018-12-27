import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import * as moment from 'moment'
import NumberFormat from 'react-number-format';

import {  FormGroup, Button, Label, FormControl, Form } from 'react-bootstrap';
import request from 'superagent'
import { API_URL } from '../App'
import {withRouter} from "react-router-dom";

class Profile extends Component {
    formFields = {
        FirstName:{ label:'Name',value:''},
        LastName:{ label:'Last name',value:''},
        Email:{ label:'Email',value:''},
      //  Password:{ label:'Password',value:''},
        DateOfBirth:{label:'Birthday', value:''},
        CellPhone:{label:'Phone number',value:''},
    }

    constructor(props) {
        super(props)

        let user = JSON.parse(localStorage.getItem('loggedUser'))
        console.log('user',user)
        let cust_data = user && user.Customer.Customer
        if (!cust_data){
            console.log('not logged in');
            return props.history.push('/');

        }else{
          cust_data.DateOfBirth = this.convertDate(cust_data.DateOfBirth)
          this.state = {
              customer: cust_data,
              form: {
                  FirstName: cust_data.FirstName,
                  LastName: cust_data.LastName,
                  Email: cust_data.Email,
                  Password: cust_data.Password,
                  DateOfBirth: cust_data.DateOfBirth,
                  CellPhone: cust_data.CellPhone,
              },
              access_token: user && user.access_token
          }

          this.logout = this.logout.bind(this)
        }
    }

      updateProfile = () =>{
        if(!this.state.form) return false;
        console.log('updateForm[]',this.state.form);
        let form = this.state.form
        form.DateOfBirth = this.reConvertDate(form.DateOfBirth)
        request
        .put(API_URL + '/account/'+this.state.customer.ID+'?access_token='+this.state.access_token)
        .send(form)
        .then(res => {
          console.log(res)

          if (res.body.error) {
            throw new Error(res.body.error)
          }

          if (res.body.ArgumentErrors) {
            throw new Error(res.body.ArgumentErrors.map(error => error.ErrorMessage))
          }
          if (res.body.IsSuccess===true){
            this.setState(prev => ({ ...prev, errors: null }))
            this.refreshCustomerData()
            alert("Your profile was saved successfully")
          }else if (res.body.ErrorMessage && res.body.ErrorMessage ==='invalid access token'){
            alert("Your session has expired, you have to login again.")
          }else{
            alert('An error has ocurred. Try Later.');
          }


        })

        .catch(errors => {
          alert(errors.message)
          this.setState(prev => ({ ...prev, errors }))
        })
      }

      refreshCustomerData = () =>{
        request
        .get(API_URL + '/account/'+this.state.customer.ID+'?access_token='+this.state.access_token)
        .then(res => {


          if (res.body.error) {
            throw new Error(res.body.error)
          }

          if (res.body.ArgumentErrors) {
            throw new Error(res.body.ArgumentErrors.map(error => error.ErrorMessage))
          }
          if (res.body.IsSuccess===true){
            console.log(res.body)
            if (res.body.Customer){
              let user = JSON.parse(localStorage.getItem('loggedUser'))
              user.Customer = res.body.Customer
              localStorage.setItem('loggedUser', JSON.stringify(user))
              this.setState(
                  prev => ({ ...prev,
                    customer: user.Customer.Customer,
                    form: {
                        FirstName: user.Customer.Customer.FirstName,
                        LastName: user.Customer.Customer.LastName,
                        Email: user.Customer.Customer.Email,
                        Password: user.Customer.Customer.Password,
                        DateOfBirth: user.Customer.Customer.DateOfBirth,
                        CellPhone: user.Customer.Customer.CellPhone}

                   })
              )
            }
//            this.setState(prev => ({ ...prev, errors: null }))
          }else if (res.body.ErrorMessage && res.body.ErrorMessage ==='invalid access token'){
            alert("Your session has expired, you have to login again.")
          }else{
            alert('An error has ocurred. We cannot get your profile data. Try Later.');
          }


        })

        .catch(errors => {
          alert(errors.message)
          this.setState(prev => ({ ...prev, errors }))
        })
      }

    setCustomer(customer) {
        this.setState(prev => ({ ...prev,
            name: customer.Name

        }))
    }

    handleChange(value, key){
        this.setState(prev => ({form:{...prev.form,[key]:value}}))
    }

    logout() {
        localStorage.removeItem('loggedUser')
        this.setState(prev => ({ ...prev, customer: null }))
        return this.props.history.push('/');

    }
    convertDate = (dob) => {
        dob = dob.replace("/Date(","");
        dob = dob.replace(")/","");

        return moment(dob,'x').format('MM/DD/YYYY');
    }
    reConvertDate = (dob) => {
        let ret = dob
        dob = dob.split('/');
        if (dob.length && dob.length === 3){
          ret = dob[2]+'-'+dob[0]+'-'+dob[1]
        }
        return ret
    }
    render() {


        let fields = Object.keys(this.formFields).map(x =>  <FormGroup key={x} id={"form" + x}>
            <Label>{this.formFields[x].label+ ': '}</Label>
            {
              (x==='CellPhone')?

              <NumberFormat
              value={this.state.form[x]}
              placeholder={"Change your " + x}
              className="form-control"
              onChange={e => this.handleChange(e.target.value,x)}
              format="###-###-####" />


              :<FormControl
                  type="text"
                  value={this.state.form[x]}
                  placeholder={"Change your " + x}
                  onChange={e => this.handleChange(e.target.value,x)}
              />
            }

            </FormGroup>)
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4">
        <div className="title"><h2>My account</h2></div>
        <div className="UserCreation">
            <Form className="whitebackground">
                {fields}
                <Button  className="selectBtnModal" onClick={()=>this.updateProfile()}>Save</Button>
                <Button  className="selectBtnModal marginLeft20" onClick={ this.logout }>Logout</Button>
            </Form>
        </div>
        </div>
        );
    }
}
export default  withRouter(Profile);
