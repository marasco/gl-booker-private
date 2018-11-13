import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import '../App.css';
import Specialist from './dropdown';
import Calendar from './datapicker';

class Treatment extends Component{
    constructor(){
        super()
       /*this.onTypeaheadaChange = this.onTypeaheadChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);*/
}
render(){
    return(
        <div className="selectreatment">
            <Row>
                <Col>
                    <img src="" alt="1"></img>
                    <h1>Treatment 1</h1>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>SELECT</Button>
                    <Specialist></Specialist>
                </Col>
            </Row>
              <Row>
                <Col>
                    <img src="" alt="2"></img>
                    <h1>Treatment 2</h1>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>SELECT</Button>
                    <Specialist></Specialist>
                </Col>
              </Row>
              <Row>
                <Col>
                    <img src="" alt="3"></img>
                    <h1>Treatment 3</h1>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>SELECT</Button>
                    <Specialist></Specialist>
                </Col>
              </Row>
              <Row> 
                <Col>
                    <img src="" alt="4"></img>
                    <h1>Treatment 4</h1>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(4)} active={this.state.rSelected === 4}>SELECT</Button>
                    <Specialist></Specialist>
                </Col>
              </Row>
                <Row>
                <Col>
                    <img src="" alt="5"></img>
                    <h1>Treatment 5</h1>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(5)} active={this.state.rSelected === 5}>SELECT</Button>
                    <Specialist></Specialist>
                </Col>
                </Row>
                <Row>
                <Col>
                    <img src="" alt="6"></img>
                    <h1>Treatment 6</h1>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(6)} active={this.state.rSelected === 6}>SELECT</Button>
                    <Specialist></Specialist>
                </Col>
            </Row>
             <Calendar></Calendar>
             <Button outline color="danger">Next</Button>
        </div>
        );
    }
}
export default Treatment;