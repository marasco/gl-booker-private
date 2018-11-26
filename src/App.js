import React from 'react';
import './App.css';
import LoginForm from './components/loginForm';
import Footer from './components/footer';
import {Nav, NavItem, Navbar} from 'react-bootstrap'; 


class App extends React.Component {
  render() {
    let user = JSON.parse(localStorage.getItem('user'))
    let pages = [
      {name:'link nav1',path:'/link1'},
      {name:'link nav2',path:'/link2'},
      {name:'link nav3',path:'/link3'},
      {name:'link nav4',path:'/link4'},
      
    ]
    if(user)
    console.log(user)
    let buttons = () => {
        return (
       
              <Nav>
              {pages.map(page => (
                <NavItem href={page.path}>{page.name}>Link</NavItem>
                ))}
              </Nav>)
      }

    return (
      <div className="App container">
         <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#home">Home</a>
                </Navbar.Brand>
                {buttons()}
                <LoginForm />
            </Navbar.Header>
          </Navbar>
          <Footer />
      </div>
    );
  }
}

export default App;
