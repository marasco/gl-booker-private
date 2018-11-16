import React, { Component } from 'react';
import { Button, FormGroup, Label, FormControl } from 'react-bootstrap';

class NewsLetter extends Component{
    formFields = {
        email:{ label:'Email',value:''},
    }
    state = {
        form:{
            emailnewsletter:'',
        }
    };

    render(){
        let data = Object.keys(this.formFields).map(x =>  <FormGroup key={x} id={"form" + x}>
            <Label>{this.formFields[x].label+ ': '}</Label>
                    <FormControl className="mailnews"
                        type="text"
                        value={this.state.form[x]}
                        placeholder={"Enter your " + x}
                        onChange={e => this.handleChange(e.target.value,x)}
                    />
                    </FormGroup>)
        return(
                <div className="newsletter">
                    <h1>BECOME A GLO INSIDER, SIGN UP FOR GLO NEWSLETTER/OFFERS AND RECEIVE 10% OFF YOUR FIRST ORDER</h1>
                    {data}
                    <Button outline color="danger">I’M IN!</Button>
                </div>
        );
    }
}
export default NewsLetter;