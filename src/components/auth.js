import React, {Component} from 'react'
import request from 'superagent'
import LoginForm from './loginForm';
import ResetForm from './resetForm';
import RegisterForm from './registerForm';
import {API_URL, API_USER, API_PASS} from '../App'
import {Modal, Col} from 'react-bootstrap';
import {withRouter} from "react-router-dom";

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Sign In',
            errors: null,
            showSection: 'signin',
            users: JSON.parse(localStorage.getItem('users')) || [],
            loggedUser: localStorage.getItem('loggedUser')
        }
        localStorage.removeItem('pendingCheckout');
    }

    login = (email, password) => {
        request
            .post(API_URL + '/account/login')
            .auth(API_USER, API_PASS)
            .send({
                Email: email,
                Password: password
            })
            .then(res => {
                if (res.body.error) {
                    throw new Error(res.body.error)
                }
                localStorage.setItem('loggedUser', JSON.stringify(res.body))

                this.setState(prev => ({
                    ...prev,
                    loggedUser: res.body.Customer
                }), () => {
                    this.props.setAuthModal(false);
                    let pendingCheckout = localStorage.getItem('pendingCheckout');
                    if( pendingCheckout ) {
                        localStorage.removeItem('pendingCheckout');
                        this.props.history.push('/checkout');
                    }
                })
            })
            .catch(err => {
                alert(err)
            })
    }

    logout = () => {
        this.setState({
            loggedUser: null
        }, () => {
            localStorage.removeItem('loggedUser')
        })
    }

    register = (form) => {
        form.DateOfBirth = this.formatDate(form.DateOfBirth)
        request
            .post(API_URL + '/account')
            .auth(API_USER, API_PASS)
            .send(form)
            .then(res => {

                if (res.body.ArgumentErrors) {
                    throw res.body.ArgumentErrors.map(error => error.ErrorMessage)
                }

                if (res.body.ErrorMessage) {
                    throw ([{param: 'Error', msg: res.body.ErrorMessage}])
                }
                if (res.body.IsSuccess===true){
                  this.setState(prev => ({...prev, errors: null}),()=>{
                      this.login(form.Email,form.Password)
                  })
                }
            })

            .catch(errors => {
              console.log('errors',errors);debugger;
                if (errors.status) {
                    // Handle non-200 gracefully.
                    errors = errors.response.body.errors
                }
                this.setState(prev => ({...prev, errors}))
            })
    }

    openSignIn = () => {
        this.setState(prev => ({
            ...prev,
            title: 'Sign In',
            errors: null,
            showSection: 'signin'
        }))
    }

    openSignUp = () => {
        this.setState(prev => ({
            ...prev,
            title: 'Sign Up',
            errors: null,
            showSection: 'signup'
        }))
    }

    submitForgotPassword = (form) => {
        request
            .post(API_URL + '/account/forgot-password')
            .auth(API_USER, API_PASS)
            .send({Email: form.email, Firstname: form.firstname})
            .then(res => {
                if (res.body.error) {
                    throw new Error(res.body.error)
                }

                if (res.body.ArgumentErrors) {
                    throw res.body.ArgumentErrors.map(error => error.ErrorMessage)
                }
                if (typeof res.body !== 'undefined' &&
                    typeof res.body.ErrorMessage === 'string' && res.body.ErrorMessage.length > 0) {
                    alert(res.body.ErrorMessage)
                } else {
                    alert('Check your email to reset your password');
                    this.setState(prev => ({...prev, errors: null}))
                    this.openSignIn()
                }
            })

            .catch(errors => {
                if (errors.status) {
                    errors = errors.response.body.errors
                }
                this.setState(prev => ({...prev, errors}))
            })
    }

    openForgotPassword = () => {
        this.setState({
            title: 'Forgot Password',
            errors: null,
            showSection: 'forgotpassword'
        })
        console.log('open forgot')
    }

    formatDate = (userDate) => {
        // split date string at '/'
        var dateArr = userDate.split('/');
        if (dateArr.length !== 3) {
            return userDate;
        }

        // check for single number dar or month
        // prepend '0' to single number dar or month
        if (dateArr[0].length === 1) {
            dateArr[0] = '0' + dateArr[0];
        } else if (dateArr[1].length === 1) {
            dateArr[1] = '0' + dateArr[1];
        }

        // concatenate new values into one string
        userDate = dateArr[2] + '-' + dateArr[0] + '-' + dateArr[1];

        // return value
        return userDate;
    }

    addUser = (user) => {
        let users = [...this.state.users, user]
        this.setState(prev => ({...prev, users: users}))
        localStorage.setItem('users', JSON.stringify(users))
    }

    close = () => {
      this.setState({
        showSection:'signin',
        title: 'Sign In'
      })
        this.props.setAuthModal(false);
    }

    render() {
        return <div>
            <Modal show={this.props.showAuthModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        {this.state.errors && (
                            <ul>
                                {this.state.errors.map(error => {
                                  return (typeof error === 'object')?
                                  <li key={error.param}>{error.param}: {error.msg}</li>:
                                  <p>{error}</p>
                                }


                                )}
                            </ul>
                        )}
                        {
                            (this.state.showSection === 'signin') ?
                                <LoginForm user={this.state.loggedUser}
                                           openForgotPassword={this.openForgotPassword}
                                           openSignUp={this.openSignUp}
                                           login={this.login}
                                           logout={this.logout}/>
                                : <div></div>
                        }
                        {
                            (this.state.showSection === 'forgotpassword') ?
                                <ResetForm user={this.state.loggedUser}
                                           submitForgotPassword={this.submitForgotPassword}
                                />
                                : <div></div>

                        }
                        {
                            (this.state.showSection === 'signup') ?
                                <RegisterForm user={this.state.loggedUser}
                                              openSignIn={this.openSignIn}
                                              login={this.login}
                                              logout={this.logout}
                                              submit={this.register}/>
                                : <div></div>
                        }
                    </Col>
                </Modal.Body>
            </Modal>
        </div>
    }
}
export default withRouter(Auth);
