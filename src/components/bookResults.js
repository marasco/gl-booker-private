import React, { Component } from 'react';
import BookResultTable from './bookResultTable';
import request from "superagent";
import {API_URL} from "../App";
import moment from "moment";

class BookResults extends Component{

    constructor(props) {
        super(props)

        let { treatments } = this.props.order
        let keys = Object.keys(treatments)
        let treatment = treatments[keys[0]].treatment
        let specialist = treatments[keys[0]].specialist

        this.state = {
            times:[],
            loading:true,
            specialist,
            specialists: [],
            treatment,
            date: moment(this.props.data.date).format("YYYY-MM-DD"),
        };
    }
//     book = (slot) => {
//       console.log('booking '+slot )
// //      this.props.addToCart(treatmentId,specialistId,date,slot,treatmentName,specialistName,price)
//       return true;

//     }
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
            treatments: Object.keys(this.props.order.treatments).map(key => {
              let {treatment, specialist} = this.props.order.treatments[key]
              return {
                id: treatment.ID,
                employeeId: (specialist)?specialist.ID:null,
              }
            }),
            includeEmployees:true,
            format:24
        }

        request
            .post(API_URL + '/availability/itinerary/1day')
            .set('Authorization', 'Bearer xxxx')
            .send(query)
            .then(res => {
                try {
                    let times = []
                    if( res && res.body  && res.body.itineraryList) {

                        res.body.itineraryList.map(itinerary=>{
                            if( itinerary.availabilities ) {
                                itinerary.availabilities.map(item=>{

                                    let duration=0
                                    item.availabilityItems.map(service=>{
                                        duration = duration + service.duration
                                    })
                                    let time = item.time.substring(0,5);
                                    times.push({
                                        start: time,
                                        end: moment(time,"HH:mm").add(duration,"minutes").format("HH:mm"),
                                        startDate: item.startDateTime,
                                        slot: item,
                                    })
                                    return item
                                })
                            }
                            return itinerary
                        })
                    }
                    console.log('times',times)
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
                        <BookResultTable order={this.props.order} times={this.state.times} orderAddItem={this.props.orderAddItem} orderRemoveItem={this.props.orderRemoveItem}></BookResultTable>
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
