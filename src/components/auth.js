import React, { Component } from 'react'
import request from 'superagent'
import { Redirect } from 'react-router-dom'
import LoginForm from './loginForm';
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

  register(form) {
    request
    .post(API_URL + '/account')
    .send(form)
    .then(res => {
      console.log(res)

      if (res.body.error) {
        throw [res.body.error]
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
            openSignUp={this.openSignUp}
            login={this.login}
            logout={this.logout} />
          :
          <RegisterForm user={this.state.loggedUser}
            openSignIn={this.openSignIn}
            login={this.login}
            logout={this.logout}
            submit={this.register} />
          }
          </Col>
        </Modal.Body>
      </Modal>
    )
  }

}
