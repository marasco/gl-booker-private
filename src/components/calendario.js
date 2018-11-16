import React, { Component } from 'react';
import Calendar from 'react-calendar';



class Calendario extends React.Component {
  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })
    
  render() {
   
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          tileDisabled={({activeStartDate, date, view }) => date.getDate() % 2}
        />
      </div> 
    );
  }
}
export default Calendario;