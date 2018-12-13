import React from 'react';
import request from 'superagent'
import * as moment from 'moment'
import Calendar from 'react-calendar';
import { API_URL } from '../App'
import BookResults from './bookResults';

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
  addToCart = (treatmentId,specialistId,date,time,treatmentName,specialistName)=>{
    this.props.addToCart(treatmentId,specialistId,date,time,treatmentName,specialistName)
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
        this.setState({ availability, loading:false },()=>{
          this.props.scrollDown()
        })
      }
      catch (error) {
        console.error(error)
        this.setState({loading:false})
        throw new Error('Error loading calendar');
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

      <div className="col-xs-12 centered marginTop20 marginBottom40">
        <Calendar className="fix"
          onChange={this.onChange}
          value={this.state.date}
          tileDisabled={ this.tileDisabledCallback }
        />
          {
            (this.state.date)? <BookResults addToCart={this.addToCart} scrollDown={this.props.scrollDown} data={this.props.data}/>:<span></span>
          }
      </div>
      :
      <div className="col-xs-12 centered marginBottom40">
        Loading availability...
      </div>
    }
    </div>
    );
  }

}
