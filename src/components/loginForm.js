import React, { Component } from 'react';
import '../App.css';
import {  FormGroup, Button, Col, Label, FormControl, Form } from 'react-bootstrap';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            form: {
                email: '',
                password: '',
                validate: {
                    emailState: '',
                  },
                loginError:''
            }
        };
        this.login = this.login.bind(this)
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

    login() {
        this.props.login(this.state.form.email, this.state.form.password)
    }
  render() {
    return (
        <div className="LoginForm">

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
                        <Label htmlFor="examplePassword">Password</Label>
                        <FormControl
                            type="password"
                            value={this.state.form.password}
                            name="password"
                            id="examplePassword"
                            placeholder="********"
                            onChange={e => this.handleChange(e.target.value, 'password')}
                            />
                    </FormGroup>
                </Col>
                </Form>
                </div>
                <div className="centered marginTop20">
                    <Button onClick={ this.login }
                        className="selectBtnModal">Sign In</Button>
                </div>
                <Col className="marginTop20">
                    <a href={null} onClick={this.props.openForgotPassword}>Forgot my Password</a>
                </Col>
                <Col className="marginTop20">
                    You don't have an account? <a href={null} onClick={this.props.openSignUp}>Create an Account</a>
                </Col>

        </div>
    );
  }
}
export default LoginForm;
