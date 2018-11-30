import React from 'react';
import './App.css';
import {Nav, NavItem, Navbar} from 'react-bootstrap'; 

export const API_URL = 'https://gl-bookings-server-staging.herokuapp.com/api';

class App extends React.Component {

  render() {
    let users = JSON.parse(localStorage.getItem('users'))
    let pages = [
      {name:'treatments',path:'/treatment'},
      //{name:'book',path:'/book'},
      {name: 'sign in', path: '/signin'},
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
      <div className="App container marginBottom20">
         <Navbar>
            <Navbar.Header>
                {buttons()}
            </Navbar.Header>
          </Navbar>
      </div>
    );
  }
}

export default App;
