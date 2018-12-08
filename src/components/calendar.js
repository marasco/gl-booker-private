import React from 'react';
import request from 'superagent'
import * as moment from 'moment'
import Calendar from 'react-calendar';
import { Button } from 'react-bootstrap';
import { API_URL } from '../App'

export default class Calendario extends React.Component {

  constructor(props){
      super(props)

      this.state = {
        // Get date from global wizard data.
        date: props.data.date,
        availability: [],
      }

      this.load()
  }

  load = () => {
    request
    .get(API_URL + '/availability')
    .set('Authorization', 'Bearer xxxx')
    .query({
        fromDate: moment().format('Y-MM-DD'),
        toDate: moment().add(1, 'month').format('Y-MM-DD'),
        treatmentId: this.props.data.treatment.ID,
        employeeId: this.props.data.specialist.ID,
    })
    .then(res => {
      try {
        let availability = res.body[0].serviceCategories[0].services[0].availability
        console.log(availability)
        this.setState({ availability })
      }
      catch (error) {
        throw { message: 'Error loading calendar', error }
      }
    })
    .catch(e => {
      console.log(e)
      alert(e.message)
    })
  }

  onChange = date => {
    this.props.push({ date })
    this.setState({ date })
  }

  tileDisabledCallback = ({activeStartDate, date, view }) => {
    return !this.state.availability.some(
      availableDate => moment(availableDate).diff(date, 'days') === 0
    )
  }

  render() {
    return (
      <div className="col-xs-12 centered marginTop20">
        <Calendar className="fix"
          onChange={this.onChange}
          value={this.state.date}
          tileDisabled={ this.tileDisabledCallback }
        />
      </div>
    );
  }

}
