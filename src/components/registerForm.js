import React, { Component } from 'react';
import {  FormGroup, Button, Col, Label, FormControl, Form } from 'react-bootstrap';
import NumberFormat from 'react-number-format';


class RegisterForm extends Component {
    formFields = {
        FirstName:{ label:'First Name',value:''},
        LastName:{ label:'Last name',value:''},
        Email:{ label:'Email',value:''},
        Password:{ label:'Password',value:''},
        ConfirmPassword:{ label:'Confirm Password',value:''},
        CellPhone: { label: 'CellPhone', value: '' },
        DateOfBirth: { label: 'Date of Birth', value: '' },
    }
    state = {
        form:{
            FirstName:'',
            LastName:'',
            Email:'',
            ConfirmPassword:'',
            Password:'',
            CellPhone: '',
            DateOfBirth: '',
        }
    };
    handleChange(value, key){
        this.setState(prev => ({form:{...prev.form,[key]:value}}))
    }

    render() {
        let fields = Object.keys(this.formFields).map(x =>  <FormGroup key={x} id={"form" + x}>
            <Label>{this.formFields[x].label+ ': '}</Label>

{
            (x==='CellPhone')?

              <NumberFormat
              value={this.state.form[x]}
              placeholder={"Your phone number"}
              className="form-control"
              onChange={e => this.handleChange(e.target.value,x)}
              format="###-###-####" />
            : (x==='DateOfBirth')?
            <NumberFormat
            value={this.state.form[x]}
            placeholder={"MM/DD/YYYY"}
            className="form-control"
            onChange={e => this.handleChange(e.target.value,x)}
            format="##/##/####" />
              :
            <FormControl
                type={(x==='Password'||x==='ConfirmPassword')?"password":"text"}
                value={this.state.form[x]}
                placeholder={"Enter your " + this.formFields[x].label}
                onChange={e => this.handleChange(e.target.value,x)}
            />
          }
            </FormGroup>

          )
    return (
        <div>
        <div className="UserCreation">
            <Form className="whitebackground">
                {fields}
                <div className="centered marginTop20">
                <Button
                onClick={()=>this.props.submit(this.state.form)}
                className="selectBtnModal" >Register</Button>
                </div>
            </Form>
        </div>
        <Col className="centered marginTop20">
            Do you have an account? <a href={null} onClick={this.props.openSignIn}>Login</a>
        </Col>
        </div>
        );
    }
}
export default RegisterForm;
