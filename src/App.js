import React from 'react';
import './App.css';
import Auth from './components/auth';
import {Nav, NavItem, Navbar} from 'react-bootstrap';
import Wizard from './components/wizard'

export const API_URL = process.env.REACT_APP_API_URL;
export const API_USER = process.env.REACT_APP_API_USERNAME;
export const API_PASS = process.env.REACT_APP_API_PASS;

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        showAuthModal:false
      }
  }

  setAuthModal = (status) => {
    if (status){
      this.setState({
          showAuthModal: status
      })
    }else{
      this.setState({
          showAuthModal: status
      })
    }
  }

  scrollUp = () => {
      window.scroll({
          behavior: 'smooth',
          left: 0,
          top: 0
      });
  }

  scrollDown = () => {
      window.scroll({
          behavior: 'smooth',
          left: 0,
          top: document.documentElement.scrollHeight-200
      });
  }

  render() {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
    return (
      <div className="App fluid-container">
         <Auth scrollDown={this.scrollDown} setAuthModal={this.setAuthModal} showSection={this.state.showSection} showAuthModal={this.state.showAuthModal}/>
         <Navbar>
            <Navbar.Header>
                <Nav>
                    <NavItem key={"treatments"} href={"/"}>{"Treatments"}</NavItem>
                    {
                        (loggedUser)?<NavItem key={"appointments"} href={"/appointments"}>{"My Appointments"}</NavItem>:null
                    }
                    {
                        (loggedUser)?<NavItem key={"myaccount"} href={"/myaccount"}>{"My Account"}</NavItem>:null
                    }
                    {
                        (!loggedUser)?<NavItem key={"signin"} href={"#"} onClick={()=>{ this.setAuthModal(true) }} >Sign In</NavItem>:null
                    }
                </Nav>
            </Navbar.Header>
          </Navbar>
          {
              (this.props.location.pathname === '/')?<Wizard scrollDown={this.scrollDown}  scrollUp={this.scrollUp} setAuthModal={this.setAuthModal} />:null
          }
      </div>
    );
  }
}

export default App;
