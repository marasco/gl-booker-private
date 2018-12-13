import React from 'react';
import './App.css';
import Auth from './components/auth';
import {Nav, NavItem, Navbar} from 'react-bootstrap';

export const API_URL = process.env.REACT_APP_API_URL;

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        showAuthModal:false
      }
  }

  setAuthModal = (status) => {
      this.setState({
          showAuthModal:status
      })
  }

  render() {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
    let buttons = () => {
        return (
          <Nav>
            {
                (loggedUser)?<NavItem key={"myaccount"} href={"/myaccount"}>{"My Account"}</NavItem>:<div></div>
            }
            <NavItem key={"treatments"} href={"/"}>{"Treatments"}</NavItem>
            <NavItem key={"signin"} onClick={()=>{ this.setAuthModal(true) }} >Sign In</NavItem>
          </Nav>)
      }

    return (
      <div className="App container">
         <Auth setAuthModal={this.setAuthModal} showAuthModal={this.state.showAuthModal}/>
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