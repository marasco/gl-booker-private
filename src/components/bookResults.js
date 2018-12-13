import React, { Component } from 'react';
import BookResultTable from './bookResultTable';
import {  FormGroup, Label, FormControl } from 'react-bootstrap';
import request from "superagent";
import {API_URL} from "../App";
import moment from "moment";

class BookResults extends Component{
    formFields = {
        who:{ label:'WHO',value:''},
        when:{ label:'WHEN',value:''},
        with:{ label:'WITH',value:''},
    }
    state = {
        form:{
            who:'',
            when:'',
            with:'',
        },
        times:[],
        loading:true,
        specialist: this.props.data.specialist,
        specialists: [],
        treatment: this.props.data.treatment,
        date: moment(this.props.data.date).format("YYYY-MM-DD"),
    };
    book = (slot, specialistId) => {
      const treatmentId = this.state.treatment['ID'];
      const date = this.state.date
      console.log('booking '+slot + '/'+specialistId+'/'+treatmentId+'/'+date)
      this.props.addToCart(treatmentId,specialistId,date,slot)
      return true;

    }
    loadData = () => {
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
        if( prevProps.data.date && this.props.data.date ) {
            if( moment(prevProps.data.date).toISOString() !== moment(this.props.data.date).toISOString() ) {
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
            fromDate: this.state.date,
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
                                                        })
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
                alert(e.message)
                this.setState({loading:false})
            })
    }
    render(){
        Object.keys(this.formFields).map(x =>  {
            return (
            <div className="col-xs-12 col-sm-4"  key={"list" +x}><FormGroup key={x} id={"form" + x}>

            <Label>{this.formFields[x].label+ ': '}</Label>

            <FormControl
                type="text"
                value={this.state.form[x]}
                onChange={e => this.handleChange(e.target.value,x)}
            />
            </FormGroup></div>

           )
        })

        return(
            <div>
                {(this.state.loading)?<span>Loading...</span>:
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
