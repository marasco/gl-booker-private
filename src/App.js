import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/datapicker'
import Treatment from './components/treatment'
import Dropdown from './components/dropdown'

class App extends React.Component {
  render() {
    return (
      <div className="App">
         <Treatment />
         <Calendar />
         <Dropdown />
      </div>
    );
  }
}

export default App;
