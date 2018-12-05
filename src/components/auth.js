import React, { Component } from 'react'
import request from 'superagent'
import { Redirect } from 'react-router-dom'
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { API_URL } from '../App'

export default class Auth extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showSection: 'signin',
      users: JSON.parse(localStorage.getItem('users')) || [],
      loggedUser: localStorage.getItem('loggedUser'),
    }

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.addUser = this.addUser.bind(this)
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

  addUser(user){
    let users = [...this.state.users,user]
    this.setState( prev => ({ ...prev, users: users }) )
    localStorage.setItem('users', JSON.stringify(users))
  }
  openSignUp = () =>{
    this.setState(prev => ({ ...prev, showSection:'signup'}))
  }
  openSignIn = () =>{
    this.setState(prev => ({ ...prev, showSection:'signin'}))
  }
  render() {
    if (this.state.loggedUser) {
      return (<Redirect to="myaccount" />)
    }
    return (


      <div>
      {
      (this.state.showSection==='signin')?
      <LoginForm user={this.state.loggedUser} openSignUp={this.openSignUp} login={this.login} logout={this.logout} />
      :
      <RegisterForm user={this.state.loggedUser} openSignIn={this.openSignIn} login={this.login} logout={this.logout} />

    }
      </div>
    )
  }

}
