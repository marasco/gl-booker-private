import React, { Component } from 'react';
import {  FormGroup, Button, Label, FormControl } from 'react-bootstrap';

class Signup extends Component {
    formFields = {
        name:{ label:'Name',value:''},
        lastname:{ label:'Last name',value:''},
        email:{ label:'Email',value:''},
        password:{ label:'Password',value:''},
    }
    state = {
        form:{
            name:'',
            lastname:'',
            email:'',
            password:'',
        } 
    };
    render() {
        let fields = Object.keys(this.formFields).map(x =>  <FormGroup key={x} id={"form" + x}>
            <Label>{this.formFields[x].label+ ': '}</Label>
            <FormControl
                type="text"
                value={this.state.form[x]}
                placeholder={"Enter your " + x}
                onChange={e => this.handleChange(e.target.value,x)}
            />
            </FormGroup>)
    return (
        <div className="UserCreation">
            <form className="whitebackground">
                {fields}
                <Button bsStyle="primary">Register</Button>
            </form>
        </div>
        );
    }
}
export default Signup;