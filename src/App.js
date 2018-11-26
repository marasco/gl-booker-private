import React from 'react';
import './App.css';
import LoginForm from './components/loginForm';
import Footer from './components/footer';
import {Nav, NavItem, Navbar} from 'react-bootstrap'; 


class App extends React.Component {
  render() {
    let users = JSON.parse(localStorage.getItem('users'))
    let pages = [
      {name:'treatments',path:'/treatment'},
      {name:'signup',path:'/signup'},
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
                <LoginForm />
            </Navbar.Header>
          </Navbar>
      </div>
    );
  }
}

export default App;
