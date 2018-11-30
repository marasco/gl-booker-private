import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {  FormGroup, Button, Label, FormControl, Form } from 'react-bootstrap';


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

        this.state = {
            customer: user && user.Customer.Customer
        }

        this.logout = this.logout.bind(this)
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

    render() {
        if (!this.state.customer) {
            return (<Redirect to="/signin" />)
        }

        let fields = Object.keys(this.formFields).map(x =>  <FormGroup key={x} id={"form" + x}>
            <Label>{this.formFields[x].label+ ': '}</Label>
            <FormControl
                type="text"
                value={this.state.customer[x]}
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
                <Button bsStyle="primary" onClick={()=>this.props.refresh(this.state.form)}>Accept</Button>
                <Button onClick={ this.logout }>Logout</Button>
            </Form>
        </div>
        </div>
        );
    }
}
export default Profile;