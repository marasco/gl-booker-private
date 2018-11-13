import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: moment()
    };
  }

  render() {
    return ( <DatePicker
        todayButton={"Vandaag"}
        selected={this.state.startDate}
        onChange={this.handleChange}
    />
    );
}

handleChange(date) {
  this.setState({
    startDate: date
  });
}
}

export default Calendar;
