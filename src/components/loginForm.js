import React, { Component } from 'react';
import '../App.css';
import {  FormGroup, Button, Col, Label, FormControl, Modal, Form } from 'react-bootstrap';


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
    let button = () => {
        if (!this.props.user) return (<Button bsStyle="primary" onClick={this.handleShow}>Log in</Button>)
        return (
            <div>
                <span>{this.props.user.email}</span>
                <Button bsStyle="primary" onClick={this.props.logout}>Log out</Button>
            </div>
            )
    }
    return (

        <div className="col-xs-12 col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4">
        <div className="title"><h2>Sign In</h2></div>

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

                    <Button onClick={ this.login }
                        color="success"
                        bsStyle="primary">Sign In</Button>

                <Col className="marginTop20">
                    You don't have an account? <a href={null} onClick={this.props.openSignUp}>Create an Account</a>
                </Col>

        </div>
    </div>
    );
  }
}
export default LoginForm;
