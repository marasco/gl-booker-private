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

        <div className="col-xs-12 col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4">
        <div className="title"><h2>LogIn</h2></div>

        <div className="LoginForm">
        
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
                            onChange={(e)=>{

                            }}
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
                            onChange={(e)=>{
                                
                            }}
                            />
                    </FormGroup>
                </Col>
                {button()}
            </form>
        </div>
        </div>
    );
  }
} 
export default LoginForm; 