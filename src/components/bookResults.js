import React, { Component } from 'react';
import BookResultTable from './bookResultTable';
import request from "superagent";
import {API_URL} from "../App";
import moment from "moment";

class BookResults extends Component{

    constructor(props) {
        super(props)

        let { items } = this.props.order
        let keys = Object.keys(items)
        let treatment = items[keys[0]].treatment
        let specialist = items[keys[0]].specialist

        this.state = {
            times:[],
            loading:true,
            specialist,
            specialists: [],
            treatment,
            date: moment(this.props.data.date).format("YYYY-MM-DD"),
        };
    }
    book = (slot, specialistId,specialistName) => {
      const treatmentId = this.state.treatment['ID'];
      const treatmentName = this.state.treatment['Name'];
      const price = this.state.treatment['Price']['Amount'];
      const date = this.state.date
      console.log('booking '+slot + '/'+specialistId+'/'+treatmentId+'/'+date)
      this.props.addToCart(treatmentId,specialistId,date,slot,treatmentName,specialistName,price)
      return true;

    }
    loadData = () => {
        this.setState({ loading: true })

        this.loadSpeacialists(this.state.treatment['ID']).then((specialists)=>{
            this.setState({
                specialists:specialists
            },()=>{this.loadTimes()})
        })
    }

    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate(prevProps) {
        if( prevProps.order.date && this.props.order.date ) {
            if( moment(prevProps.order.date).toISOString() !== moment(this.props.order.date).toISOString() ) {
                this.loadData()
            }
        }
    }

    loadSpeacialists = treatmentId => {
        return new Promise((resolve,reject)=>{
            request
                .get(API_URL + '/employees')
                .set('Authorization', 'Bearer xxxx')
                .query({
                    pageSize: 1000,
                    treatmentId,
                })
                .then(res=>{
                    let specialists = {}

                    res.body.Results.map(record => {
                        specialists[record['ID']] = record
                        return record
                    })

                    resolve(specialists);
                }).catch(error => {
                    console.log(error)
                    reject({});
            });
        })
    }

    loadTimes = () => {
        let query = {
            fromDate: moment(this.props.order.date).format("YYYY-MM-DD")+'T00:00:00-08:00',
            "treatmentId[]": this.state.treatment['ID'],
            includeEmployees:true,
            format:24
        }
        if( this.state.specialist['ID'] )
            query.employeeId = this.state.specialist['ID']

        request
            .get(API_URL + '/availability/1day')
            .set('Authorization', 'Bearer xxxx')
            .query(query)
            .then(res => {
                try {
                    let times = []
                    if( res && res.body ) {

                        res.body.map(loc=>{
                            loc.serviceCategories.map(servCat=>{
                                if( servCat.services ) {
                                    servCat.services.map(service=>{
                                        let duration = service.duration;
                                        if( service.availability ) {
                                            service.availability.map(availability=>{
                                                if( availability.employees && availability.slots ) {
                                                    availability.employees.map(employeeId => {
                                                        availability.slots.map(slot=>{
                                                            let specialist = (this.state.specialists[employeeId])?this.state.specialists[employeeId]:null;
                                                            if( specialist ) {
                                                                times.push({
                                                                    start: slot,
                                                                    end: moment(slot,"HH:mm").add(duration,"minutes").format("HH:mm"),
                                                                    with: specialist.LastName+", "+specialist.FirstName,
                                                                    slot: slot,
                                                                    specialistId: specialist.ID
                                                                })
                                                            }
                                                            return slot
                                                        })
                                                        return employeeId
                                                    })
                                                }
                                                return availability
                                            })
                                        }
                                        return service
                                    })
                                }
                                return servCat
                            })
                            return loc
                        })
                    }
                    this.setState({
                        times:times,
                        loading:false
                    })
                }
                catch (error) {
                    console.error(error)
                    this.setState({loading:false})
                    throw new Error('Error loading calendar times')
                }
            })
            .catch(e => {
                console.log(e)
                alert('We cannot find available times for this date');
                this.setState({loading:false})
            })
    }
    render(){


        return(
            <div>
                {(this.state.loading)?<div className="marginTop20 marginBottom40">Loading...</div>:
                    <div className="timetable marginTop20">
                        <BookResultTable book={this.book} times={this.state.times} specialists={this.state.specialists}></BookResultTable>
                        {
                            (false)?
                                <div className="col-xs-12 centered">
                                    <h3>Congratulations we’ll see you soon!</h3>
                                    <h4> #GLOtoGO </h4>
                                </div>:<span></span>
                        }
                    </div>
                }
            </div>
        );
    }
}
export default BookResults;
