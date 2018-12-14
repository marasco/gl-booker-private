import React, { Component } from 'react';
import { API_URL } from '../App';
import request from "superagent";

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
                    "customerId": (false)?this.state.loggedUser.Customer.CustomerID:119677090,
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
                                    id: appointment.ID
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

    componentDidMount = () => {
        this.load();
    }

    render() {
        let appointments = this.state.appointments.map(appointment=>{
            return <div key={appointment.id}>TEST</div>
        })

        return (
            <div>
                {appointments}
            </div>
        )
    }
}
export default Appointments;
