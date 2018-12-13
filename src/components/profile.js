import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import * as moment from 'moment'
import {  FormGroup, Button, Label, FormControl, Form } from 'react-bootstrap';
import request from 'superagent'
import { API_URL } from '../App'

class Profile extends Component {
    formFields = {
        FirstName:{ label:'Name',value:''},
        LastName:{ label:'Last name',value:''},
        Email:{ label:'Email',value:''},
        Password:{ label:'Password',value:''},
        DateOfBirth:{label:'Birthday', value:''},
        CellPhone:{label:'Phone number',value:''},
    }

    constructor() {
        super()

        let user = JSON.parse(localStorage.getItem('loggedUser'))
        console.log('user',user)
        let cust_data = user && user.Customer.Customer
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

      updateProfile = () =>{
        if(!this.state.form) return false;
        console.log('updateForm[]',this.state.form);

        request
        .put(API_URL + '/account/'+this.state.customer.ID+'?access_token='+this.state.access_token)
        .send(this.state.form)
        .then(res => {
          console.log(res)

          if (res.body.error) {
            throw new Error(res.body.error)
          }

          if (res.body.ArgumentErrors) {
            throw res.body.ArgumentErrors.map(error => error.ErrorMessage)
          }
          if (res.body.IsSuccess===true){
            this.setState(prev => ({ ...prev, errors: null }))
            alert("Your profile was saved successfully")
          }else{
            alert('An error has ocurred. Try Later.');
          }


        })

        .catch(errors => {
          if (errors.status) {
            // Handle non-200 gracefully.
            errors = errors.response.body.errors
          }
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
    }
    convertDate = (dob) => {
        dob = dob.replace("/Date(","");
        dob = dob.replace(")/","");

        return moment(dob,'x').format('MM/DD/YYYY');
    }
    render() {
        if (!this.state.customer) {
            return (<Redirect to="/" />)
        }

        let fields = Object.keys(this.formFields).map(x =>  <FormGroup key={x} id={"form" + x}>
            <Label>{this.formFields[x].label+ ': '}</Label>
            <FormControl
                type="text"
                value={this.state.form[x]}
                placeholder={"Change your " + x}
                onChange={e => this.handleChange(e.target.value,x)}
            />
            </FormGroup>)
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4">
        <div className="title"><h2>My account</h2></div>
        <div className="UserCreation">
            <Form className="whitebackground">
                {fields}
                <Button  className="selectBtnModal" onClick={()=>this.updateProfile()}>Accept</Button>
                <Button  className="selectBtnModal marginLeft20" onClick={ this.logout }>Logout</Button>
            </Form>
        </div>
        </div>
        );
    }
}
export default Profile;
