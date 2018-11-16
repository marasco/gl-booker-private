import React, { Component } from 'react';
import './App.css';
import Treatment from './components/treatment'
import BookResults from './components/bookResults'
import Calendar from './components/calendar'
import LoginForm from './components/loginForm';
import Signup from './components/signup';
import NewsLetter from './components/newsletter';

/*se pueden agregar los componentes loginForm y signup para ver como quedaron creados*/

class App extends React.Component {
  render() {
    return (
      <div className="App container">
      	  <div>
              <h1>BOOK A SERVICE</h1>
              <h3>Welcome to Georgia Louise bookings, the leading destination for  the most advanced facials in Manhattan, home to celebrity and world-acclaimed facialist, Georgia Louise, and her elite team. Its time to book your bespoke GLO</h3>
          </div>
          <Treatment />
          <Calendar />
          <BookResults />
          <NewsLetter />
      </div>
    );
  }
}

export default App;
