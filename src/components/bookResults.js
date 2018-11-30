import React, { Component } from 'react';
import BookResultTable from './bookResultTable';
import {  FormGroup, Label, FormControl } from 'react-bootstrap';

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
        } 
    };
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
                <div className="timetable">
                    <div className="no-visible">
                    <h1>BOOK A SERVICE</h1>
                    <h2>The Hollywood EGF Facial</h2>

                    <div className="col-xs-12">
                    <form>{ getdata }</form>
                    </div>
                    </div>
                    <BookResultTable></BookResultTable>
                    <div className="centered">
                    <h3>Congratulations we’ll see you soon!</h3>
                    <h4> #GLOtoGO </h4>
                    </div>
                </div>
        );
    }
}
export default BookResults;