import React, { Component } from 'react';
import {  FormGroup, Button, Label, FormControl, Form } from 'react-bootstrap';


class Profile extends Component {
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

    handleChange(value, key){
        this.setState(prev => ({form:{...prev.form,[key]:value}}))
    }
    render() {
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
        <div className="title"><h2>Profile</h2></div>
        <div className="UserCreation">
            <Form className="whitebackground">
                {fields}
                <Button bsStyle="primary" onClick={()=>this.props.refresh(this.state.form)}>Accept</Button>
            </Form>
        </div>
        </div>
        );
    }
}
export default Profile;