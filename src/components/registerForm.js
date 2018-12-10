import React, { Component } from 'react';
import {  FormGroup, Button, Col, Label, FormControl, Form } from 'react-bootstrap';


class RegisterForm extends Component {
    formFields = {
        FirstName:{ label:'Name',value:''},
        LastName:{ label:'Last name',value:''},
        Email:{ label:'Email',value:''},
        Password:{ label:'Password',value:''},
        CellPhone: { label: 'Phone', value: '' },
        DateOfBirth: { label: 'Birthdate', value: '' },
    }
    state = {
        form:{
            FirstName:'',
            LastName:'',
            Email:'',
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
            <FormControl
                type="text"
                value={this.state.form[x]}
                placeholder={(x==="DateOfBirth")?"Enter your " + x+" (mm/dd/yyyy)":"Enter your " + x}
                onChange={e => this.handleChange(e.target.value,x)}
            />
            </FormGroup>)
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
        <Col className="marginTop20">
            Do you have an account? <a href={null} onClick={this.props.openSignIn}>Login</a>
        </Col>
        </div>
        );
    }
}
export default RegisterForm;
