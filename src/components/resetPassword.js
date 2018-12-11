import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {  FormGroup, Button, Label, FormControl, Form } from 'react-bootstrap';
import request from 'superagent'
import { API_URL } from '../App'

class ResetPassword extends Component {
    formFields = {
        Password:{
            label:'Password',
            placeholder:'Set your Password',
            value:'',
            type:"password"
        },
        RepeatPassword:{
            label:'Repeat Password',
            placeholder:'Repeat your Password',
            value:'',
            type:"password"
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            form: {
                Password: "",
                RepeatPassword:""
            }
        }
    }

    handleChange(value, key){
        this.setState(prev => ({form:{...prev.form,[key]:value}}))
    }

    resetPassword = () => {
        console.log("Reset Endpoint")
    }

    render() {
        let fields = Object.keys(this.formFields).map(x =>  <FormGroup key={x} id={"form" + x}>
            <Label>{this.formFields[x].label+ ': '}</Label>
            <FormControl
                type={this.formFields[x].type}
                value={this.state.form[x]}
                placeholder={this.formFields[x].placeholder}
                onChange={e => this.handleChange(e.target.value,x)}
            />
            </FormGroup>)
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4">
        <div className="title"><h2>Reset Password</h2></div>
        <div className="UserCreation">
            <Form className="whitebackground">
                {fields}
                <Button disabled={(this.state.form.Password && this.state.form.Password.length >= 8 && this.state.form.RepeatPassword && this.state.form.RepeatPassword == this.state.form.Password)?false:true} className="selectBtnModal" onClick={()=>this.resetPassword()}>Submit</Button>
            </Form>
        </div>
        </div>
        );
    }
}
export default ResetPassword;
