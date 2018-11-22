import React from 'react';
import './App.css';
import Treatment from './components/treatment'
import BookResults from './components/bookResults'
import Calendar from './components/calendar'
import LoginForm from './components/loginForm';
import Signup from './components/signup';
import NewsLetter from './components/newsletter';
import Profile from './components/profile';

/*se pueden agregar los componentes loginForm y signup para ver como quedaron creados*/

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
  updateUser(){
    
  }
  render() {
    return (
      <div className="App container">
      	  <div className="section-1 col-xs-12">
              <h1>BOOK A SERVICE</h1>
              <h3>Welcome to Georgia Louise bookings, the leading destination for  the most advanced facials in Manhattan, home to celebrity and world-acclaimed facialist, Georgia Louise, and her elite team. Its time to book your bespoke GLO</h3>
          </div>
          <Treatment />
          <Calendar />
          <BookResults />
      	  <LoginForm user={this.state.loggedUser} login={this.login} logout={this.logout} />
      	  <Signup submit={this.addUser} />
          <Profile refresh={this.updateUser} />
          <NewsLetter />
	
      </div>
    );
  }
}

export default App;
