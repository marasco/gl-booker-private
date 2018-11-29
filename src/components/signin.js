import React, { Component } from 'react'
import Signup from './signup';
import LoginForm from './loginForm';

export default class SignIn extends Component {

  constructor(props) {
    super(props)

    this.state = {
      users: JSON.parse(localStorage.getItem('users')) || [],
      loggedUser: JSON.parse(localStorage.getItem('loggedUser')) || null
    }

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.addUser = this.addUser.bind(this)
  }

  login(user){
    let foundUser = this.state.users.find(x => x.email == user.email)
    if(foundUser && user.password === foundUser.password){
      this.setState(prev => ({...prev, loggedUser:user}))
      localStorage.setItem('user', user)
    }
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

  render() {
    return (
      <div>
      <LoginForm user={this.state.loggedUser} login={this.login} logout={this.logout} />
      <Signup submit={this.addUser} />
      </div>
    )
  }

}
