import React from 'react';
import request from 'superagent'
import * as moment from 'moment'
import Calendar from 'react-calendar';
import { API_URL } from '../App'
import BookResultTable from './bookResultTable';

export default class Calendario extends React.Component {

  constructor(props){
      super(props)

      this.state = {
        // Get date from global wizard data.
        date: props.data.date,
        availability: [],
        loading: true
      }

  }
  componentDidMount = () => {
    this.load()
  }
  load = () => {
    this.setState({loading: true})
    request
    .get(API_URL + '/availability')
    .set('Authorization', 'Bearer xxxx')
    .query({
        fromDate: moment().format('Y-MM-DD'),
        toDate: moment().add(1, 'month').format('Y-MM-DD'),
        treatmentId: this.props.data.treatment.ID,
        employeeId: (this.props.data.specialist && this.props.data.specialist.ID)?this.props.data.specialist.ID:null,
    })
    .then(res => {
      try {
        let availability = res.body[0].serviceCategories[0].services[0].availability
        console.log(availability)
        this.setState({ availability, loading:false })
      }
      catch (error) {
        console.error(error)
        throw new Error('Error loading calendar')
        this.setState({loading:false})
      }
    })
    .catch(e => {
      console.log(e)
      alert(e.message)
      this.setState({loading:false})
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
      <div>
      {
        (!this.state.loading)?

      <div className="col-xs-12 centered marginTop20">
        <Calendar className="fix"
          onChange={this.onChange}
          value={this.state.date}
          tileDisabled={ this.tileDisabledCallback }
        />
          {
            (this.state.date)? <BookResultTable/>:<span></span>
          }
      </div>
      :
      <div className="col-xs-12 centered marginTop20">
        Loading availability...
      </div>
    }
    </div>
    );
  }

}
