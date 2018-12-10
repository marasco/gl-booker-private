import React, { Component } from 'react'
import request from 'superagent'
import { Redirect } from 'react-router-dom'
import LoginForm from './loginForm';
import ResetForm from './resetForm';
import RegisterForm from './registerForm';
import { API_URL } from '../App'
import { Modal, Col } from 'react-bootstrap';


export default class Auth extends Component {

  constructor(props) {
    super(props)

    let user = localStorage.getItem('loggedUser')

    this.state = {
      title: 'Sign In',
      errors: null,
      redirect: user ? 'myaccount' : null,
      showSection: 'signin',
      users: JSON.parse(localStorage.getItem('users')) || [],
      loggedUser: user,
    }

    this.close = this.close.bind(this)
    this.submitForgotPassword = this.submitForgotPassword.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.addUser = this.addUser.bind(this)
    this.register = this.register.bind(this)
  }

  login(email, password){
    request
    .post(API_URL + '/account/login')
    .send({
      Email: email,
      Password: password
    })
    .then(res => {
      console.log(res)

      if (res.body.error) {
        throw res.body.error
      }

      localStorage.setItem('loggedUser', JSON.stringify(res.body))

      this.setState(prev => ({ ...prev,
        redirect: 'myaccount',
        loggedUser: res.body.Customer,
      }))
    })

    .catch(err => {
      alert(err)
    })
  }

  logout(){
    this.setState(prev => ({ ...prev, loggedUser:null}))
    localStorage.removeItem('loggedUser')
  }
  submitForgotPassword(form){
    request
    .post(API_URL + '/account/forgot-password')
    .send({Email: form.email, Firstname: form.firstname})
    .then(res => {
      console.log(res)

      if (res.body.error) {
        throw new Error(res.body.error)
      }

      if (res.body.ArgumentErrors) {

        throw res.body.ArgumentErrors.map(error => error.ErrorMessage)
      }
      if (typeof res.body !== 'undefined' &&
        typeof res.body.ErrorMessage === 'string' && res.body.ErrorMessage.length > 0){
          alert(res.body.ErrorMessage)
      }else{
          alert('Check your email to reset your password');
          this.setState(prev => ({ ...prev, errors: null }))
          this.openSignIn()
      }

    })

    .catch(errors => {
      if (errors.status) {
        // Handle non-200 gracefully.
        errors = errors.response.body.errors
      }

      this.setState(prev => ({ ...prev, errors }))
    })
  }
  // format from M/D/YYYY to YYYYMMDD

  formatDate(userDate) {
   // split date string at '/'
   var dateArr = userDate.split('/');
   if (dateArr.length!==3){
     return userDate;
   }
   //test results of split
   console.log(dateArr[0]);
   console.log(dateArr[1]);
   console.log(dateArr[2]);

   // check for single number dar or month
   // prepend '0' to single number dar or month
   if(dateArr[0].length === 1){
     dateArr[0] = '0' + dateArr[0];
   } else if (dateArr[1].length === 1){
     dateArr[1] = '0' + dateArr[1];
   }

   // concatenate new values into one string
   userDate = dateArr[2] +'-'+ dateArr[0] +'-'+ dateArr[1];
   // test new string value
   console.log(userDate);

   // return value
   return userDate;
  }

  register(form) {
    form.DateOfBirth = this.formatDate(form.DateOfBirth)
    request
    .post(API_URL + '/account')
    .send(form)
    .then(res => {
      console.log(res)

      if (res.body.error) {
        throw new Error(res.body.error)
      }

      if (res.body.ArgumentErrors) {
        throw res.body.ArgumentErrors.map(error => error.ErrorMessage)
      }

      this.setState(prev => ({ ...prev, errors: null }))
      this.openSignIn()
    })

    .catch(errors => {
      if (errors.status) {
        // Handle non-200 gracefully.
        errors = errors.response.body.errors
      }
      this.setState(prev => ({ ...prev, errors }))
    })
  }

  close() {
    this.setState(prev => ({ ...prev, redirect: '/' }))
  }

  addUser(user){
    let users = [...this.state.users,user]
    this.setState( prev => ({ ...prev, users: users }) )
    localStorage.setItem('users', JSON.stringify(users))
  }
  openSignUp = () =>{
    this.setState(prev => ({ ...prev,
      title: 'Sign Up',
      errors: null,
      showSection:'signup'
    }))
  }
  openSignIn = () =>{
    this.setState(prev => ({ ...prev,
      title: 'Sign In',
      errors: null,
      showSection:'signin'
    }))
  }
  openForgotPassword = () =>{
    this.setState(prev => ({ ...prev,
      title: 'Forgot Password',
      errors: null,
      showSection:'forgotpassword'
    }))
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={ this.state.redirect } />)
    }
    return (
      <Modal show={ true } onHide={ this.close }>
        <Modal.Header>
          <Modal.Title>{ this.state.title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
          { this.state.errors && (
            <ul>
            { this.state.errors.map(error => (
              <li key={ error }>{ JSON.stringify(error) }</li>
            ))}
            </ul>
          )}

          {
          (this.state.showSection==='signin')?
          <LoginForm user={this.state.loggedUser}
            openForgotPassword={this.openForgotPassword}
            openSignUp={this.openSignUp}
            login={this.login}
            logout={this.logout} />
          :<div></div>
        }
        {
          (this.state.showSection==='signup')?
          <RegisterForm user={this.state.loggedUser}
            openSignIn={this.openSignIn}
            login={this.login}
            logout={this.logout}
            submit={this.register} />
            :<div></div>
        }
        {
            (this.state.showSection==='forgotpassword')?
            <ResetForm user={this.state.loggedUser}
              submitForgotPassword={this.submitForgotPassword}
             />
            :<div></div>

          }
          </Col>
        </Modal.Body>
      </Modal>
    )
  }

}
