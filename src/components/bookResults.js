import React, { Component } from 'react';
import BookResultTable from './bookResultTable';
import {  FormGroup, Label, FormControl } from 'react-bootstrap';
import request from "superagent";
import {API_URL} from "../App";
import moment from "moment";

class BookResults extends Component{
    constructor(props){
        super(props)
    }
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
        loading:true
    };
    componentDidMount() {
        console.log(this.props.data)
        this.load()
    }

    load = () => {
        request
            .get(API_URL + '/availability/1day')
            .set('Authorization', 'Bearer xxxx')
            .query({
                fromDate: "2018-12-10",
                "treatmentId[]": 304035,
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
                                                times.push({
                                                    start: availability.startDateTime,
                                                    end: availability.endDateTime,
                                                    with: "--Get Name--",
                                                })
                                            })
                                        }
                                    })
                                }
                            })
                        })
                    }

                    this.setState({
                        times:times,
                        loading:false
                    })
                }
                catch (error) {
                    console.error(error)
                    throw new Error('Error loading calendar times')
                    this.setState({loading:false})
                }
            })
            .catch(e => {
                console.log(e)
                alert(e.message)
                this.setState({loading:false})
            })
    }
    render(){
        let getdata = Object.keys(this.formFields).map(x =>  {
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
                        <BookResultTable times={this.state.times}></BookResultTable>
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