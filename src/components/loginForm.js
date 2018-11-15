import React, { Component } from 'react';
import '../App.css';
import {  FormGroup, Button, Col, Label, FormControl } from 'react-bootstrap';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                password: '',
            }
        };
    }
  render() {
    let usuario = JSON.parse(localStorage.getItem('usuario'))
    let button = () => {
        if (!usuario) return (<Button bsStyle="primary">Log in</Button>)
        return (<Button bsStyle="primary">Log out</Button>)
    }
    return (
        <div className="LoginForm">
        {button()}
        <form className="form">
                <Col>
                    <FormGroup>
                        <Label>Email</Label>
                        <FormControl
                            type="email"
                            value={this.state.form.email}
                            name="email"
                            id="exampleEmail"
                            placeholder="myemail@email.com"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <FormControl
                            type="password"
                            value={this.state.form.password}
                            name="password"
                            id="examplePassword"
                            placeholder="********"
                            />
                    </FormGroup>
                </Col>
            </form>
        </div>
    );
  }
} 
export default LoginForm; 