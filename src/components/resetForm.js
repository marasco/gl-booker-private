import React, { Component } from 'react';
import '../App.css';
import {  FormGroup, Button, Col, Label, FormControl, Form } from 'react-bootstrap';


class ResetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            form: {
                firstname: '',
                email: '',
                validate: {
                    emailState: '',
                  },
                loginError:''
            }
        };
        this.submitForgotPassword = this.submitForgotPassword.bind(this)
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleChange(value, key){
        this.setState(prev => ({form:{...prev.form,[key]:value}}))
    }

    submitForgotPassword() {
        this.props.submitForgotPassword(this.state.form)
    }
  render() {

    return (
        <div className="ResetForm">

                <div>
                <Form className="form">
                <Col>
                    <FormGroup>
                            <Label>Email</Label>
                            <FormControl
                                type="email"
                                value={this.state.form.email}
                                name="email"
                                id="exampleEmail"
                                placeholder="myemail@email.com"
                                onChange={e => { this.handleChange(e.target.value, 'email')}}
                            />
                        </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                            <Label>Your First Name</Label>
                            <FormControl
                                type="text"
                                value={this.state.form.firstname}
                                name="firstname"
                                id="firstname"
                                placeholder="Your first name"
                                onChange={e => { this.handleChange(e.target.value, 'firstname')}}
                            />
                        </FormGroup>
                </Col>
                </Form>
                </div>
                <div className="centered marginTop20">

                    <Button onClick={ this.submitForgotPassword }
                      className="selectBtnModal" >Submit</Button>

        </div>
        </div>
    );
  }
}
export default ResetForm;
