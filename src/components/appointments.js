import React, { Component } from 'react';
import { API_URL, API_USER, API_PASS } from '../App';
import request from "superagent";
import moment from 'moment';

class Appointments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedUser: JSON.parse(localStorage.getItem('loggedUser')),
            appointments: []
        }
    }

    load = () => {

        try {
            request
                .post(API_URL + '/appointment/find')
                .auth(API_USER, API_PASS)
                .query({})
                .send({
                    "customerId": this.state.loggedUser.Customer.CustomerID,
                    "access_token": this.state.loggedUser.access_token,
                    "fromStartDate": "2018-01-01",
                    "toStartDate": "2019-12-31",
                })
                .then(res=>{
                    console.log('xhr.response:',res.body.Results)
                    if( res.body.Results && res.body.Results.length ) {
                        this.setState({
                            appointments: res.body.Results.map(appointment => {



                                return {
                                    id: appointment.ID,
                                    startDate: this.convertDate(appointment.StartDateTime),
                                    treatments: appointment.AppointmentTreatments,
                                    treatment:{
                                        name: appointment.Treatment.Name
                                    },
                                    status: {
                                        name: appointment.Status.Name
                                    },
                                    specialist: {
                                        firstName: appointment.AppointmentTreatments[0].Employee.FirstName,
                                        lastName: appointment.AppointmentTreatments[0].Employee.LastName,
                                    },
                                    payment: {
                                        price: appointment.FinalTotal.Amount
                                    }
                                }
                            })
                        })
                    }
                }).catch(error => {
                    console.log(error)
                    alert(error.message)
            });

        } catch (e){
            console.error(e)
            alert(e.message)
        }
    }

    convertDate = (dob) => {
        dob = dob.replace("/Date(","");
        dob = dob.replace(")/","");

        return moment(dob,'x').format('MM/DD/YYYY HH:mm');
    }


    componentDidMount = () => {
        this.load();
    }

    render() {
        if (!this.state.appointments){
          return <div className="row" key="emptyApps">
                  <div className="col-xs-12">No appointments yet</div></div>
        }
        let appointments = this.state.appointments.map(appointment=>{
          console.log('app',appointment)
            return <div className="row" key={appointment.id+"row"}>
                    <div className="col-xs-12">
                        <div className="item col-xs-12">
                            <div className="desc col-xs-12">
                            {(()=>{
                              let items=[]
                              appointment.treatments.map((treat,i,arr)=>{
                                let divider = i<arr.length-1 && <br/>;
                                let spec=<span>{treat.Employee.LastName}, {treat.Employee.FirstName}</span>
                                items.push(<span><strong>{treat.Treatment.Name}</strong> <i>(with {spec})</i>{divider}</span>);
                              })
                              return items
                              }
                            )()}


                              <br />at {appointment.startDate} -
                              <br /><strong>USD {appointment.payment.price}.00</strong>
                              <br />{appointment.status.name}</div>
                        </div>
                    </div>
            </div>
        })

        return (
            <div className="cart centered">
                <div className="title">My Appointments</div>
                <div className="list">
                    {this.state.appointments.length ? appointments : (
                        <p>You don’t have any bookings yet</p>
                    )}
                </div>
            </div>
        )
    }
}
export default Appointments;
