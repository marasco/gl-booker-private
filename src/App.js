import React from 'react';
import './App.css';
import LoginForm from './components/loginForm';
import {Nav, NavItem, Navbar} from 'react-bootstrap'; 
import Signup from './components/signup';


class App extends React.Component {
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
    let users = JSON.parse(localStorage.getItem('users'))
    let pages = [
      {name:'treatments',path:'/treatment'},
      {name:'book',path:'/book'},
      {name:'profile',path:'/myaccount'},
      
    ]
    if(users)
    console.log(users)
    let buttons = () => {
        return (
       
              <Nav>
              {pages.map(page => (
                <NavItem href={page.path}>{page.name}></NavItem>
                ))}
              </Nav>)
      }

    return (
      <div className="App container">
         <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">Home</a>
                </Navbar.Brand>
                {buttons()}
                <LoginForm user={this.state.loggedUser} login={this.login} logout={this.logout} />
                <Signup submit={this.addUser} />
            </Navbar.Header>
          </Navbar>
      </div>
    );
  }
}

export default App;
