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
        request
            .get(API_URL + '/availability/1day')
            .set('Authorization', 'Bearer xxxx')
            .query({
                employeeId: this.state.specialist['ID'],
                fromDate: this.state.date,
                "treatmentId[]": this.state.treatment['ID'],
                includeEmployees:true,
                format:24
            })
            .then(res => {
                try {
                    let times = []
                    if( res && res.body ) {
                        res.body.map(loc=>{
                            loc.serviceCategories.map(servCat=>{
                                if( servCat.services ) {
                                    servCat.services.map(service=>{
                                        if( service.availability ) {
                                            service.availability.map(availability=>{
                                                const specialist = this.state.specialists[this.state.specialist['ID']]
                                                times.push({
                                                    start: moment(availability.startDateTime).format("hh:mm A"),
                                                    end: moment(availability.endDateTime).format("hh:mm A"),
                                                    with: specialist.LastName+", "+specialist.FirstName,
                                                })
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
                        <BookResultTable times={this.state.times} specialists={this.state.specialists}></BookResultTable>
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
