import React from 'react';
import request from 'superagent'
import * as moment from 'moment'
import Calendar from 'react-calendar';
import { API_URL, API_USER, API_PASS } from '../App'
import BookResults from './bookResults';

export default class Calendario extends React.Component {

  constructor(props){
      super(props)

      this.state = {
        // Get date from global wizard data.
        date: props.data.date,
        availability: [],
        loading: false,
        showCalendar: false
      }

  }
  componentDidMount = () => {
    this.load()
  }
  // addToCart = (treatmentId,specialistId,date,time,treatmentName,specialistName,price)=>{
  //   this.props.addToCart(treatmentId,specialistId,date,time,treatmentName,specialistName,price)
  // }
  load = () => {
    console.log('treatments',this.props.order.treatments);

    if (Object.keys(this.props.order.treatments).length ===0){
      alert('Please, select one or more treatments first.');
      return false;
    }else{
      this.setState({loading: true})
    }
  this.props.scrollDown()
  request
    .post(API_URL + '/availability/itinerary-dates')
    .auth(API_USER, API_PASS)
    .send({
        fromDate: moment().format('Y-MM-DD')+'T00:00:00-08:00',
        toDate: moment().add(1, 'month').format('Y-MM-DD')+'T00:00:00-08:00',
        treatments: Object.keys(this.props.order.treatments).map(key => {
          let {treatment, specialist} = this.props.order.treatments[key]
          return {
            id: treatment.ID,
            employeeId: (specialist)?specialist.ID:null,
          }
        }),
        includeEmployees: true,
    })
    .then(res => {
      if (res.body && res.body.availability) {
        let availability = res.body.availability
        console.log('availability', availability)
        return this.setState({ availability, loading:false })
      }

      throw new Error('Sorry, there is no availavility for the selected services');
    })
    .catch(e => {
      console.log(e)
      alert(e.message)
      this.props.prevStep();
    })
  }

  onChange = date => {
    this.props.selectDate(date)

    if (this.props.isActiveStep) {
      this.props.nextStep()
    }
    // this.props.push({ date })
    // this.setState({ date })
  }

  tileDisabledCallback = ({activeStartDate, date, view }) => {
    return !this.state.availability.some(
      availableDate => moment(availableDate).isSame(moment(date), 'date')
    )
  }

  render() {
    return (
      <div>
      {
        (!this.state.loading)?
          <div>
          {
            (this.state.availability.length > 0)?
            <div className="col-xs-12 centered marginTop20 marginBottom40">
              <Calendar className="fix"
                onChange={this.onChange}
                value={this.state.date}
                tileDisabled={ this.tileDisabledCallback }
              />
            </div>
            :
            <div></div>
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
