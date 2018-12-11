import React from 'react';
import './App.css';
import {Nav, NavItem, Navbar} from 'react-bootstrap';

export const API_URL = process.env.REACT_APP_API_URL;

class App extends React.Component {

  render() {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
    let pages = [
      {name:'treatments',path:'/'},
      //{name:'book',path:'/book'},
      {name: 'sign in', path: '/signin'},
      {name:'my account',path:'/myaccount'},

    ]
    let buttons = () => {
        return (

              <Nav>
              {pages.map(page => (
                (page.path!=='/myaccount' || loggedUser)?
                <NavItem key={page.name+"route"} href={page.path}>{page.name}</NavItem>:<div></div>

                ))}
              </Nav>)
      }

    return (
      <div className="App container">
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
