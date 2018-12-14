import React, { Component } from 'react';
import { API_URL } from '../App';
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
                .set('Authorization', 'Bearer xxxx')
                .query({})
                .send({
                    "customerId": this.state.loggedUser.Customer.CustomerID,
                    "access_token": this.state.loggedUser.access_token,
                    "fromStartDate": "2018-01-01",
                    "toStartDate": "2018-12-31",
                })
                .then(res=>{
                    console.log('xhr.response:',res.body.Results)
                    if( res.body.Results && res.body.Results.length ) {
                        this.setState({
                            appointments: res.body.Results.map(appointment => {
                                return {
                                    id: appointment.ID,
                                    startDate: this.convertDate(appointment.StartDateTime),
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

        return moment(dob,'x').format('MM/DD/YYYY');
    }

    componentDidMount = () => {
        this.load();
    }

    render() {
        let appointments = this.state.appointments.map(appointment=>{
            return <div className="row" key={appointment.id+"row"}>
                    <div className="col-xs-12">
                        <div className="item col-xs-12">
                            <div className="desc col-xs-12"><strong>{appointment.treatment.name}</strong> with <i>{ appointment.specialist.lastName + ", " + appointment.specialist.firstName }</i> at {appointment.startDate} - <strong>USD {appointment.payment.price}</strong> - {appointment.status.name}</div>
                        </div>
                    </div>
            </div>
        })

        return (
            <div className="cart centered">
                <div className="title">My Appointments</div>
                <div className="list">
                    {appointments}
                </div>
            </div>
        )
    }
}
export default Appointments;
